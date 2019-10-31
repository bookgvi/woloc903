<template lang="pug">
  .bookingDialog.q-pa-lg
    .row.justify-between.q-pb-md
      .col
        .text-h5.text-bold Бронь {{ row.id }}
      .col-1
        q-btn.q-mr-md(icon="close" flat v-close-popup)
    .row
      .col
        q-input.readonly(label="Зал" readonly=true borderless)
          template(#append)
            .data {{ row.room.name }}
    .row
      .col
        q-input.readonly(label="Дата" readonly borderless)
          template(#append)
            .data {{ date }}
    .row
      .col
        q-input.readonly(label="Время" readonly borderless)
          template(#append)
            .data {{ time }}
    .row
      .col
        q-input.readonly(label="Цель" readonly borderless)
          template(#append)
            .data {{ row.eventType }}
    .row
      .col
        q-input.readonly(label="Количество гостей" readonly borderless)
          template(#append)
            .data {{ row.seats }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Источник брони" readonly borderless)
          template(#append)
            .data {{  }}
    .row
      .col
        .text-h5.text-bold Данные клиента
    .row
      .col
        q-input.readonly(label="Имя" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.fullName }}
    .row
      .col
        q-input.readonly(label="Телефон" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.phone }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Эл. почта" readonly borderless)
          template(#append)
            .data(v-if="row.customer") {{ row.customer.email }}
    .row
      .col
        .text-h5.text-bold Оплата
    .row
      .col
        q-input.readonly(label="4 ч. • 1200 р." readonly borderless)
          template(#append)
            .data {{ 4800 }}
    .row
      .col
        q-input.readonly(label="Покраска циклорамы, р." readonly borderless)
          template(#append)
            .data {{ 500 }}
    .row
      .col
        q-input.readonly(label="Набор ванны водой, р." readonly borderless)
          template(#append)
            .data {{ 300 }}
    .row
      .col
        q-input.readonly(label="Предоплата 100%, р." readonly borderless)
          template(#append)
            .data {{ 4800 }}
    .row.q-pb-lg
      .col
        q-input.readonly(label="Итого, р." readonly borderless)
          template(#append)
            .data {{ 5600 }}
    .row
      .col
        .text-h5.text-bold Комментарий
    .row.q-pb-md
      .col
        q-input.readonly(readonly borderless type="textarea")
          template(#append)
            .data {{ row.managerComment }}
    .row
      q-btn.q-mr-md(icon="close" outline v-close-popup)
      q-btn.q-mr-md(icon="delete" outline)
      q-btn.col-grow(label="Редактировать в календаре" color="primary" unelevated)
</template>
<script>
import { date } from 'quasar'
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    room: Object
  },
  computed: {
    date () {
      return date.formatDate(this.row.reservedFrom, 'D MMM YYYY')
    },
    time () {
      const time = [this.row.reservedFrom, this.row.reservedTo].map(
        part => date.formatDate(part, 'H:mm')
      ).join(' — ')
      return time
    }
  }
}
</script>

<style lang="stylus">
  .data
    font-size: 1rem

  .readonly
    border-bottom #e5e5e5 solid 1px
</style>
