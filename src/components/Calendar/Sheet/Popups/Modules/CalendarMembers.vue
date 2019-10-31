<template lang="pug">
  .q-py-xs
    .col-12.row.justify-left.items-center
      q-list(dense)
        q-item.text-body2(
          v-for="(member, index) in members"
          :key="index"
          )
          .text-body2 {{ member }}
          q-separator
    .col-12.row.justify-around.items-center
      .col-9.q-py-md
        q-input.text-body2(
          dense
          outlined
          v-model="newMember"
        )
      .col-1.q-py-md
        q-btn(
          @click="addNewMember"
          color="#B5B5B5"
          text-color="$primary"
          icon="add"
          dense
        ) {{ membersComp }}
</template>

<script>
export default {
  name: 'CalendarMembers',
  data () {
    return {
      members: [],
      newMember: ''
    }
  },
  computed: {
    membersComp () {
      return this.membersChange()
    }
  },
  methods: {
    addNewMember () {
      this.members.push(this.newMember)
      this.newMember = ''
    },
    membersChange () {
      this.$emit('membersChange', this.members)
    }
  },
  props: ['startMembers']
}
</script>

<style scoped>

</style>
