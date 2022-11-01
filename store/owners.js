import {
  getField,
  updateField
} from 'vuex-map-fields';
import user from '../plugins/mixins/navigationMixin/user';
var qs = require('qs');

export const state = () => ({
  owner: {
    user: null,
    in_property: false,
    apartment: 45,
  },
  user: {
    name: '',
    doc: '',
    username: '',
    type: 'owner',
  },
  owners: []
})


export const getters = {
  getField,
  get(state) {
    return state.owner
  },
  user(state) {
    return state.user
  }
}

export const actions = {
  async findAll({
    state,
    commit
  }, params = {}) {
    if (params.filters) {
      params.filters.apartment = {
        building: this.$auth.user.building.id
      }
    } else {
      params.filters = {
        apartment: {
          building: this.$auth.user.building.id
        }
      }
    }

    const {
      data: data
    } = await this.$axios.get('/owners', {
      params: params
    })
    commit('set', data)
  },
  async find({
    state,
    commit
  }, query) {
    var {
      data: data
    } = await this.$axios.get(`/owners/?populate=user`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    if (data.meta.pagination.total == 0) {
      commit('set', {})
      return {
        user: {
          data: {}
        }
      }
    } else {
      commit('set', {
        ...data.data[0]
      })
      return data.data[0]

    }
  },
  async create({
    state,
    commit,
    dispatch,
    getters,
    rootGetters
  }) {
    const {
      data: data
    } = await this.$axios.post('/owners', {
      data: {
        ...state.owner,
      }
    })
    return data
  },
  async update({
    state,
    commit
  }, user) {

    const {
      data: data
    } = await this.$axios.put(`/owners/${state.owner.id}`, {
      data: state.owner
    })
    commit('set', {
      ...data,
    })
  },
  async delete(id) {
    await this.$axios.delete(`/owners/${id}`)
  },

  setUser({
    commit
  }, user) {
    commit('setUser', user)
  },
  set({
    commit
  }, data) {
    commit('set', data)
  },

  clear({
    commit
  }) {
    commit('set', {
      doc: '',
      name: '',
      in_property: false

    })
  }
}
export const mutations = {
  updateField,
  set(state, data) {
    state.owner = {
      ...state.owner,
      ...data
    }
  },
  setUser(state, data) {
    state.user = {
      ...state.user,
      ...data
    }
  },

}
