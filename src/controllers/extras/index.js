import crudMixin from '../crudMixin'

export default {
  created () {
    this.getAll()
  },
  name: 'extras',
  mixins: [crudMixin],
}
