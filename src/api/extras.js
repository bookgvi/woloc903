// import api from './instance'
import extras from 'src/mocks/extras'

export default {
  getAll: async () => {
    try {
      const r = {
        data: extras
      }
      return r
    } catch (e) {
      console.warn('catch :: extras :: getAll', e)
    }
  }
}
