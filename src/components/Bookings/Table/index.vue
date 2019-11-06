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
  methods: {
    toggleDialogRow (row) {
      this.bookingRowData = row
      this.$nextTick(_ => {
        this.isModal = true
      })
    }
  },
  async created () {
    await this.$app.filters.filterDefault('bookings')
  }
}
</script>
