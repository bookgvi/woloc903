<template lang="pug">
  q-card-section.row.col-12.items-center
    .col-5
      span.text-body2.q-py-md {{ dateFormatForLabel }}
    .row.col.justify-around
      q-btn.q-mr-xs.col-3(
        outline
        size="sm"
        label="Локация"
        no-caps
        @click="today"
        color="secondary"
      )
        q-popup-proxy
          q-option-group.text-body2.q-px-md.q-pt-md(
            color="black"
            :options="$app.studios.forOptions"
            v-model="studio"
          )
      q-btn.q-mr-xs.col-3(
        outline
        size="sm"
        label="Сегодня"
        no-caps
        @click="today"
        color="secondary"
      )
      q-btn-group(outline).col.offset-1
        q-btn.q-px-sm.q-mx-none(
          @click="datePrev"
          outline
          size="sm"
          icon="chevron_left"
          color="secondary"
        )
        q-separator(vertical, inset)
        q-btn.q-px-sm.q-mx-none(
          @click="dateNext"
          outline
          size="sm"
          icon="chevron_right"
          color="secondary"
        ) {{ dateComp }} {{ studioComp }}
</template>

<script>

export default {
  name: 'NavBar',
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      date: this.startDate || '',
      studio: 0
    }
  },
  computed: {
    firstStudio () {
      if (!this.$app.studios.firstStudio || !this.$app.studios.firstStudio.id) return 0
      return this.$app.studios.firstStudio.id
    },
    dateFormatForLabel () {
      if (this.date === '') return '23 сентября, 2019'
      return `${this.$moment(this.date).format('D MMMM, YYYY')}`
    },
    dateComp () {
      return this.dateChange()
    },
    studioComp () {
      return this.studioChange()
    }
  },
  methods: {
    datePrev () {
      this.date = this.$moment(this.date).subtract({ days: 1 })
    },
    today () {
      this.date = this.$moment()
    },
    dateNext () {
      this.date = this.$moment(this.date).add({ days: 1 })
    },
    dateChange () {
      this.$emit('dateChange', this.date)
    },
    studioChange () {
      this.studio = (this.studio === 0) ? this.firstStudio : this.studio
      if (this.studio === 0) return
      this.$emit('studioChange', this.studio)
    },
  },
  props: ['startDate'],
  watch: {
    startDate (v) {
      this.date = v
    },
  }
}
</script>

<style scoped>

</style>
