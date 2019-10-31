<template lang="pug">
  .table.wrapper.wrapper--header(:key="keyNumber")
    DataTable(
      :loadData="$app.discounts.getAll"
      :columns="columns"
      :filter="$app.filters.getValues('settings')"
      @toggleDialogRow="toggleDialogRow"
      :isRowDisabled="({ expiredAt }) => !expiredAt"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить скидку" no-caps @click="addDiscount")
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        edit-discount(
          :row="row"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :allStudiosName="allStudiosName"
          @hasModal="hasModal"
          @createUpdate="createUpdate"
          @discountDelete="discountDelete"
        )
</template>

<script>
import columns from './columns'
import DataTable from 'components/DataTable'
import editDiscount from '../editDiscount/editDiscount'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import studios from '../../../../api/studios'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'promoTable',
  components: { DataTable, editDiscount, VueCtkDateTimePicker },
  data () {
    return {
      columns,
      keyNumber: 0,
      dataset: {},
      isModal: false,
      row: {},
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      rooms: [],
      singleStudio: {}
    }
  },
  async created () {
    this.filter()
  },
  methods: {
    async filter () {
      let filter = {}
      const { items } = await studios.getAll().then(resp => resp.data)
      let { studio } = this.$app.filters.getValues('settings')
      let [{ rooms }] = items.filter(item => item.id === items[0].id)
      if (!studio) {
        const roomsID = rooms.map(item => item.id)
        filter = Object.assign({}, {
          studio: items[0].id,
          rooms: roomsID
        })
        this.$app.filters.setValue('settings', 'studio', filter.studio)
        this.$app.filters.setValue('settings', 'rooms', filter.rooms)
        studio = items[0].id
      }
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
    },
    async toggleDialogRow (row) {
      this.row = row
      this.isModal = true
    },
    async hasModal () {
      await this.$nextTick()
      this.isModal = false
    },
    addDiscount () {
      this.row = {
        hourFrom: 0,
        hourTo: 23,
        startedAt: '2019-10-31T16:22:04+03:00',
        expiredAt: '2019-10-31T16:22:04+03:00'
      }
      this.isModal = true
    },
    createUpdate (id, value) {
      if (!id) {
        this.$app.discounts.addNew(value)
      } else {
        this.$app.discounts.updateOne(id, value)
      }
      this.isModal = false
      this.keyNumber++
    },
    async discountDelete (id) {
      await this.$app.discounts.deleteOne(id)
      this.isModal = false
      this.keyNumber++
    }
  }
}
</script>

<style scoped>
  .q-card {
    overflow: visible;
  }
</style>
