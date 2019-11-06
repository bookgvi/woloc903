const defaultValues = {
  customers: {},
  bookings: {
    studio: null,
    rooms: [],
    statuses: [0, 1, 2, 3, 4]
  },
  settings: {
    studio: null,
    rooms: []
  },
  calendar: {
    studio: 0,
    rooms: [],
    events: ['photo', 'video', 'event'],
    price: { min: 0, max: 10000 }
  }
}
import studios from '../../api/studios'
export default {
  name: 'filters',
  data () {
    return {
      values: defaultValues
    }
  },
  created () {
    this.readFromSession()
  },
  methods: {
    readFromSession () {
      const { filters } = sessionStorage

      if (filters) this.values = JSON.parse(filters)
    },
    saveToSession () {
      sessionStorage.filters = JSON.stringify(this.values)
    },
    getValues (page) {
      return this.values[page] || {}
    },
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
      this.saveToSession()
    },
    async filterDefault (page) {
      let filter = {}
      let { studio } = this.getValues(page)
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        let [{ rooms }] = items.filter(item => item.id === items[0].id)
        rooms = rooms.map(item => item.id)
        filter = Object.assign({}, {
          studio: items[0].id,
          rooms: rooms
        })
        this.setValue(page, 'studio', filter.studio)
        this.setValue(page, 'rooms', filter.rooms)
        if (page === 'bookings') {
          this.setValue(page, 'statuses', [0, 1, 2, 3, 4])
        }
      }
    },
    async reset (page) {
      const { values } = this
      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
        }
      }
      this.saveToSession()
    }
  }
}
