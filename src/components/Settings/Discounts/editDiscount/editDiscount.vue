<template lang="pug">
  .promo.q-pa-md
    .row.q-pb-sm
      .col
        .text-h5 Скидка № {{ row.id }}
      .col-1
        q-icon.cursor-pointer(name="close" @click="hasModal" style="font-size: 1.5rem;")
    .row
      .col.q-pr-sm
        span Локация
      .col
        span Зал
    .row.q-pb-md
      .col.q-pr-sm
        q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
      .col
        q-select(v-model="roomName" :options="rooms.map(item => item.name)" outlined dense)
    .row
      .col.q-pr-sm
        span Процент скидки
      .col
        span Минимальное кол-во часов
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.percent" outlined dense)
          template(#append)
            span(style="font-size: 75%") %
      .col
        q-input(v-model="row.minHours" outlined dense)
    .row
      span День недели
    .row.q-pb-sm(v-if="!row.id")
      .col.q-pr-sm
        .row
          q-checkbox(label="Понедельник" v-model="daysOfWeek[0]")
        .row
          q-checkbox(label="Вторник" v-model="daysOfWeek[1]")
        .row
          q-checkbox(label="Среда" v-model="daysOfWeek[2]")
        .row
          q-checkbox(label="Четверг" v-model="daysOfWeek[3]")
      .col
        .row
          q-checkbox(label="Пятница" v-model="daysOfWeek[4]")
        .row
          q-checkbox(label="Суббота" v-model="daysOfWeek[5]")
        .row
          q-checkbox(label="Воскресенье" v-model="daysOfWeek[6]")
    .row.q-pb-sm(v-if="row.id")
      .col.q-pr-sm
        .row
          q-option-group(label="Понедельник" v-model="currentDayOfWeek" :options="daysOfWeekRadio")
    .row
      .col.q-pr-sm
        span Период действия
      .col
        span Время действия
    .row.q-pb-md
      .col.q-pr-sm
        VueCtkDateTimePicker.q-pt-sm(
          v-model="row.startedAt"
          color="#81AEB6"
          formatted="D MMMM Y"
          range
          no-shortcuts
          no-label
          :label="String(dateRange)"
        )
      .col
        q-input.q-pt-sm.q-pb-md.cursor-pointer(:value="`${row.hourFrom}:00 — ${row.hourTo}:00`" @click="isTimeRange = !isTimeRange" outlined dense)
        .timeRange(v-if="isTimeRange" style="width: 100%;")
          q-range(
            v-model="rangeTime"
            :min="0"
            :max="23"
            :step="1"
            drag-range
            :left-label-value="rangeTime.min + ':00'"
            :right-label-value="rangeTime.max + ':00'"
            label-always
            markers
            snap
            color="#81AEB6"
          )
          .row
            .col.q-pr-sm
              q-btn.bg-primary.text-white(label="Сохранить" style="width: 100%" @click="timeRangeSave")
            .col
              q-btn(label="Сбросить" style="width: 100%" @click="timeRangeReset")
    .row.q-pb-md
      .col
        span Заполните только дату начала, если срок действия должен быть неограничен.
    .row.justify-center
      .col.q-mr-sm
        q-btn.q-py-md(label="Удалить" no-caps style="width: 100%" @click="discountDelete")
      .col
        q-btn.q-py-md.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%" @click="createUpdate")
</template>

<script>
import { date } from 'quasar'
import { DateRange } from 'vue-date-range'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
export default {
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    allStudiosName: Array,
    rooms: Array,
    singleStudio: Object
  },
  components: {
    DateRange,
    VueCtkDateTimePicker,
    date
  },
  data () {
    return {
      currentDayOfWeek: this.row.daysOfWeek,
      roomName: this.rooms[0].name,
      daysOfWeekRadio: [
        { label: 'Понедельник', value: 1 },
        { label: 'Вторник', value: 2 },
        { label: 'Среда', value: 3 },
        { label: 'Четверг', value: 4 },
        { label: 'Пятница', value: 5 },
        { label: 'Суббота', value: 6 },
        { label: 'Воскресенье', value: 7 }
      ],
      daysOfWeek: [false, false, false, false, false, false, false],
      dateRange: '',
      dateLabel: '',
      isTimeRange: false,
      rangeTime: {
        min: this.row.hourFrom,
        max: this.row.hourTo
      }
    }
  },
  async created () {
    await this.$nextTick()
    this.currentDayOfWeek = this.row.daysOfWeek
    this.dateRange = `${date.formatDate(this.row.startedAt, 'D MMM')} — ${date.formatDate(this.row.expiredAt, 'D MMM YYYY')}`
  },
  methods: {
    hasModal () {
      this.$emit('hasModal')
    },
    timeRangeReset () {
      this.isTimeRange = false
      this.rangeTime.min = this.row.hourFrom
      this.rangeTime.max = this.row.hourTo
    },
    timeRangeSave () {
      this.isTimeRange = false
      this.row.hourFrom = this.rangeTime.min
      this.row.hourTo = this.rangeTime.max
    },
    createUpdate () {
      let { start } = this.row.startedAt
      if (!start) { start = this.row.startedAt }
      start = date.formatDate(this.row.startedAt, 'YYYY-MM-DD')
      let { end } = this.row.startedAt
      const [{ id }] = this.rooms.filter(item => item.name === this.roomName)
      let value = typeof this.currentDayOfWeek
      if (value === 'number') {
        value = this.currentDayOfWeek
      } else {
        value = this.daysOfWeek
      }
      const newDiscount = {
        'room': id,
        'isActive': 1,
        'percent': this.row.percent,
        'minHours': this.row.minHours,
        'daysOfWeek': value,
        'startedAt': start,
        'expiredAt': end,
        'hourFrom': this.row.hourFrom,
        'hourTo': this.row.hourTo
      }
      this.$emit('createUpdate', this.row.id, newDiscount)
    },
    discountDelete () {
      this.$emit('discountDelete', this.row.id)
    }
  }
}
</script>
