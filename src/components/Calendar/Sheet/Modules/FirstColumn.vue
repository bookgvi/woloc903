<template lang="pug">
  q-markup-table.absolute.z-fab(
    flat
    square
    bordered
    style="box-sizing: border-box;"
  )
    tbody
      tr.text-body1.text-weight-bold.items-center(
      )
        td.row.col-12.items-center(
          style="height: 46px;"
          @click="allDay = !allDay"
        )
          span {{ "Время" }}
          q-space
          q-icon(
            name="fas fa-chevron-down"
          )
      tr.text-body1.text-weight-medium.items-center(
      )
        td.row.col-12.items-center(
          style="height: 41px"
        )
          span {{ firstRowForView }}
      tr.text-body1.text-weight-medium(
        style="height: 40px;"
        v-for="(t, index) in timeIntervalForView"
        :key="index"
        :value="t"
      )
        td.row.col-12.items-center(
          style="height: 40px;"
        )
          span {{ t }}
      tr.text-body1.text-weight-medium.items-center(
      )
        td.row.col-12.items-center(
          style="height: 38px"
        )
          span {{ "23:00-00:00" }} {{ allDayComp }}
</template>

<script>
export default {
  name: 'FirstColumn',
  data () {
    return {
      times: [
        '01:00-02:00',
        '02:00-03:00',
        '03:00-04:00',
        '04:00-05:00',
        '05:00-06:00',
        '06:00-07:00',
        '07:00-08:00',
        '08:00-09:00',
        '09:00-10:00',
        '10:00-11:00',
        '11:00-12:00',
        '12:00-13:00',
        '13:00-14:00',
        '14:00-15:00',
        '15:00-16:00',
        '16:00-17:00',
        '17:00-18:00',
        '18:00-19:00',
        '19:00-20:00',
        '20:00-21:00',
        '21:00-22:00',
        '22:00-23:00'
      ],
      allDay: false
    }
  },
  computed: {
    timeIntervalForView () {
      return this.allDay ? this.times : this.times.slice(8)
    },
    firstRowForView () {
      return this.allDay ? '00:00-01:00' : '08:00-09:00'
    },
    allDayComp () {
      return this.allDayChange()
    }
  },
  methods: {
    allDayChange () {
      this.$emit('allDayChange', this.allDay || false)
    }
  },
  props: {
    isAllDay: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
