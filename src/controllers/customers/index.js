import api from 'src/api'
import crudMixin from '../crudMixin'

export default {
  name: 'customers',
  data () {
    return {
      searched: []
    }
  },
  mixins: [crudMixin],
  methods: {
    async getForCalendar (search) {
      this.loading.list = true
      const { data } = await api.customers.getSearchedCustomers(search)
      if (data) {
        this.searched = data.items
        this.loading.list = false
      }
      return data
    }
  },
}
