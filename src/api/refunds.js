import api from './instance'

const API_URL = process.env.API_CABINET_URL
export default {
  getAll: async (page) => {
    try {
      const r = await api.get(`${API_URL}/refunds`, {
        params: { page }
      })
      return r.data
    } catch (e) {
      console.warn('catch :: extras :: getAll', e)
    }
  }
}
