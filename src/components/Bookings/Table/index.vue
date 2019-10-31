<template lang="pug">
  .bookings
    data-table(
      title="Бронирования"
      :loadData="$app.bookings.getAll"
      :filter="$app.filters.getValues('bookings')"
      :columns="columns"
      :details="details"
      :isRowDisabled="({ status }) => status === disabledStatus"
      @toggleDialogRow="toggleDialogRow"
    )
      template(#row-dialog="props")
        bookings-dialog(v-bind="props")
      template(#row-controls="props")
        q-btn(flat round icon="comment" title="Открыть чат")
        q-btn(flat round icon="delete" title="Удалить")
        q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
        q-btn(flat round icon="thumb_up")
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        BookingsDialog(
          :row="bookingRowData"
        )
</template>

<script>
import columns from './columns.js'
import details from './details'
import DataTable from 'components/DataTable'
import BookingsDialog from './BookingsDialog'
import studios from '../../../api/studios'

import { BOOKING_STATUSES } from 'src/common/constants'

export default {
  name: 'bookings-table',
  components: { DataTable, BookingsDialog },
  data: () => ({
    columns,
    details,
    disabledStatus: BOOKING_STATUSES.CANCELED,
    isModal: false,
    bookingRowData: {},
    room: {}
  }),
  computed: {
    returnFilter () {
      this.filter()
      return this.$app.filters.getValues('bookings')
    }
  },
  methods: {
    async filter () {
      let filter = {}
      let { studio } = this.$app.filters.getValues('bookings')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        let [{ rooms }] = items.filter(item => item.id === items[0].id)
        rooms = rooms.map(item => item.id)
        filter = Object.assign({}, {
          studio: items[0].id,
          rooms: rooms
        })
        this.$app.filters.setValue('bookings', 'studio', filter.studio)
        this.$app.filters.setValue('bookings', 'rooms', filter.rooms)
        this.$app.filters.setValue('bookings', 'statuses', [0, 1, 2, 3, 4])
      }
    },
    toggleDialogRow (row) {
      this.bookingRowData = row
      this.$nextTick(_ => {
        this.isModal = true
      })
    }
  },
  created () {
    this.filter()
  }
}
</script>
