import crudMixin from '../crudMixin'
import api from '../../api'

export default {
  data () {
    return {
      extrasForRoom: []
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getForCalendar (payload) {
      this.loading.list = true
      const res = await api.extras.getForCalendar(payload)
      if (res) {
        this.extrasForRoom = res.data.map(item => {
          return {
            ...item,
            count: 0
          }
        })
      }
      this.loading.list = false
    },

  },
  name: 'extras',
  mixins: [crudMixin],
}
