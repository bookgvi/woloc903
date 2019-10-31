<template lang="pug">
  standart-card
    name-slot(name="Промокоды")
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 60%")
              span.text-bold.text-black.text-body2 Название • Скидка
            th.text-right
              span.text-bold.text-black.text-body2 Активен до
        tbody
          tr(
            v-for="(item, index) in options"
            :key="index"
          )
            td {{ nameSlot(index) }} &nbsp
              span.text-body2.bg-cyan-3.q-pa-xs(
                v-if="!item.isActive"
              ) ugoloc
            td.text-right
              span.text-black.text-body2(
                v-if="item.isActive"
              ) {{ dateSlot(index) }}
              span.text-cyan-3.text-body2(
                v-else
                class="cursor-pointer"
                @click="isPromoDialog = true"
              ) Активировать
      promo-dialog(
        :isPromoDialog="promoDialog"
        @dialogStateChange="isPromoDialog = $event"
      )
</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
import PromoDialog from './Modules/Dialog'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'PromocodesCard',
  components: { StandartCard, PromoDialog, NameSlot },
  data () {
    return {
      isPromoDialog: false,
      options: [
        {
          name: 'Весна',
          discount: 5,
          date: this.$moment().add(99, 'days'),
          isActive: true
        },
        {
          name: 'Май15',
          discount: 15,
          date: this.$moment().add(235, 'days'),
          isActive: true
        },
        {
          name: 'Подарок10',
          discount: 10,
          date: this.$moment().add(235, 'days'),
          isActive: false
        }
      ]
    }
  },
  computed: {
    promoDialog () {
      return this.isPromoDialog
    }
  },
  methods: {
    nameSlot (index) {
      const item = this.options[index]
      return `${item.name} • ${item.discount}%`
    },
    dateSlot (index) {
      const item = this.options[index]
      return `${this.$moment(item.date).format('DD MMMM, hh:mm')}`
    },
  },
}
</script>

<style scoped>

</style>
