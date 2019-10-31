<template lang="pug">
  q-dialog(v-model="dialogState" persistent)
    q-card(style="min-width: 700px")
      q-card-section
        .row.items-center.q-py-md
          span.text-bold(
            style="line-height: 24px; font-size: 18px"
          ) Промокод № 55779
          q-space
          q-btn(
            icon="close"
            flat
            round
            dense
            v-close-popup
          )
        .row.q-pb-md
          span.text-caption Название промокода
        .row.q-pb-md
          q-input.text-body2(
            outlined
            dense
            value="Подарок10"
            style="width: 100%"
          )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Локация
            q-select.text-body2(
              outlined
              dense
              value="Kap's Studios м. Бауманская"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Зал
            q-select.text-body2(
              outlined
              dense
              value=""
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Скидка
            q-input.text-body2(
              outlined
              dense
              value="10"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Тип
            q-select.text-body2(
              outlined
              dense
              value="В процентах"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Минимальная сумма заказа, р.
            q-input.text-body2(
              outlined
              dense
              value="2000"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Статус
            q-select.text-body2(
              outlined
              dense
              value="Публичный"
              style="width: 100%"
            )
        .row.col-12.q-pb-md.q-col-gutter-md
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              value="Начало — конец"
              style="width: 100%"
            )
          .col-6
            span.row.text-caption.q-pb-md Период действия
            q-select.text-body2(
              outlined
              dense
              value="Начало — конец"
              style="width: 100%"
            )
        .row
          span.text-caption Заполните только дату начала, если срок действия должен быть неограничен.
      q-card-actions
        .row.col-12.justify-between.items-center
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              label="Отменить"
              v-close-popup
            )
          .col-6.q-px-sm
            q-btn.fit(
              no-caps
              color="primary"
              label="Добавить"
            ) {{ dialogStateComp }}
</template>

<script>
export default {
  name: 'PromoDialog',
  data () {
    return {
      dialogState: this.isPromoDialog
    }
  },
  props: {
    isPromoDialog: Boolean
  },
  computed: {
    dialogStateComp () {
      return this.dialogStateChange()
    }
  },
  methods: {
    dialogStateChange () {
      this.$emit('dialogStateChange', this.dialogState)
    }
  },
  watch: {
    isPromoDialog (v) {
      this.dialogState = v
    }
  }
}
</script>

<style scoped>

</style>
