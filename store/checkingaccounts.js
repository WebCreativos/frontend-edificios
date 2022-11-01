import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = {
  accounts: {},
  moovment: {
    amount: 0,
    type: 'deposit',
    concept: ''
  },
}


export const getters = {
  getField,
  getList(state) {
    return state.accounts
  },
}

export const actions = {
  async findAll({
    commit
  }, params) {

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
    } = await this.$axios.get('/checking-accounts', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })

    commit('setList', data.data)

  },
  async add({
    commit,
    dispatch,
    state
  }, {
    currency,
    apartment
  }) {
    const {
      data: data
    } = await this.$axios.post('/checking-accounts', {
      data: {
        ...state.moovment,
        currency: currency,
        apartment: apartment
      }
    })
    commit('setSingle',data.data)
    dispatch('clear')
  },
  clear({
    commit
  }) {
    commit('set', {})
  },
}

export const mutations = {
  updateField,
  set(state, zone) {
    state.moovment = zone
  },
  setList(state, data) {
    state.accounts = data
  },
  setSingle(state, data) {
    state.accounts.push(data)
  }

}
