<template lang="pug">
  .col-12.flex.justify-left.items-center
    q-option-group.text-body2(
      v-model="checkedExtras"
      :options="options"
      color="green"
      type="checkbox"
    ) {{ extrasComp }}
</template>

<script>
// import sortBy from 'lodash/sortBy'

export default {
  name: 'CalendarExtras',
  data () {
    return {
      checkedExtras: [...this.startExtras]
    }
  },
  computed: {
    extrasComp () {
      return this.extrasChange()
    },
    options () {
      let arr = []
      this.$app.extras.list.forEach(({ title, room }) => {
        if (room.id === this.roomId) {
          arr.push({
            label: title,
            value: title
          })
        }
      })
      return arr
    }
  },
  methods: {
    extrasChange () {
      this.$emit('extrasChange', [...this.checkedExtras])
    }
  },
  props: {
    startExtras: {
      type: Array,
      default: _ => {
        return []
      }
    },
    roomId: {
      type: Number
    }
  },
/*  watch: {
    startExtras: {
      handler (v) {
        this.checkedExtras = Object.assign(this.checkedExtras, v)
      },
      immediate: true
    }
  } */
}
</script>

<style scoped>

</style>
