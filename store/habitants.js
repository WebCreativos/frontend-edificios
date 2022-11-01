import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  habitant: {
    name: '',
    doc: '',
    type: 'owner',
    apartment: 0
  }
})
export const getters = {
  getField,
}
export const actions = {
  set({
    commit
  }, data) {
    commit('set', data)
  },
  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/habitants/`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('set', {
      ...data.data[0]
    })
  },
  async create({
    state
  }) {

    const {
      data: data
    } = await this.$axios.post('/habitants', {
      data: state.habitant
    })
    return data
  },
  clear({
    commit
  }) {
    commit('set', {
      name: '',
      doc: '',
      type: 'owner',
      apartment: 0
    })
  }
}
export const mutations = {
  updateField,
  set(state, data) {
    state.habitant = {
      ...state.habitant,
      ...data
    }
  }
}
