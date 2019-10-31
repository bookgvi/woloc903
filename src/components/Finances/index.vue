<template lang="pug">
  .finances
    .menu
      filters-list(name="finances")
        template(#prepend="props")
          studio-filter(v-bind="props")
          q-btn.q-py-none.q-px-sm(
            outline
            dense
            no-caps
            label="Дата и время"
          )
          q-btn.q-py-none.q-px-sm(
            outline
            dense
            no-caps
            label="Тип записи"
          )
    .content
      FinancesTable
</template>

<script>
import FinancesTable from './Table/index'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import FiltersList from '../Filters/FiltersList'
export default {
  name: 'RefundsIndex',
  components: {
    FiltersList,
    RoomsFilter,
    StudioFilter,
    FinancesTable,
  }
}
</script>

<style>
</style>
