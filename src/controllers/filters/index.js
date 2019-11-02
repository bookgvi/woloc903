const defaultValues = {
  customers: {},
  bookings: {
    studio: undefined,
    rooms: undefined,
    statuses: [0, 1, 2, 3, 4]
  },
  settings: {
    studio: undefined,
    rooms: []
  },
  calendar: {
    studio: 0,
    rooms: [],
    events: ['photo', 'video', 'event'],
    price: { min: 0, max: 10000 }
  }
}

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
