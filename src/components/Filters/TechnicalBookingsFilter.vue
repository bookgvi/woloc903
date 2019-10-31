<template lang="pug">
  .technicalBooking
    q-btn.q-py-none(
      :label="title"
      @click="technicalFilter"
      dense
      no-caps
      flat
      style="border: 1px solid black;"
    )
</template>

<script>
import FilterSelect from './FilterSelect'

export default {
  name: 'rooms-filter',
  components: { FilterSelect },
  props: {
    values: {
      type: Object,
    },
    onChange: Function
  },
  data () {
    return {
      isTechnical: false
    }
  },
  computed: {
    title () {
      return this.isTechnical ? 'Скрыть технические брони' : 'Показать технические брони'
    }
  },
  methods: {
    technicalFilter () {
      this.isTechnical = !this.isTechnical
      this.onChange('technical', this.isTechnical)
    }
  }
}
</script>
