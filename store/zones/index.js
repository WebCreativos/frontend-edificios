import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');
export const state = {
  zones: {
    data:[]
  },
  areaReservations: {},
  zone: {
    name: '',
    capacity: 1,
    rules: []
  }
}


export const getters = {
  getField,
  getList(state) {
    return state.zones
  },
  getReservationList(state) {
    return state.areaReservations
  },
  get(state) {
    return state.zone
  }
}

export const actions = {
  async find({
    commit
  }) {
    const {
      data: data
    } = await this.$axios.get(`/zones/?populate=rules.rule`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('set', data.data[0])
  },
  async findAll({
    commit
  }, params = {}) {
    if (params.filters) {
      params.filters.building = this.$auth.user.building.id
    } else {
      params.filters = {
        building: this.$auth.user.building.id
      }
    }


    const {
      data: data
    } = await this.$axios.get('/zones/?populate=rules.rule', {
      params: params,
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setList', data)
  },
  async findAllReservations({
    commit
  }, params) {
    const {
      data: data
    } = await this.$axios.get('/area-reservations', {
      params: {
        ...params,
        populate: '*'
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit('setAreaList', data)
  },
  async add({
    commit,
    state
  }) {
    var buldingId = this.$auth.user.building.id
    await this.$axios.post(`/zones/?populate=rules.rule`, {
      data: {
        ...state.zone,
        building: buldingId
      }
    })
  },
  async addReservation({
    commit,
    state
  }, params) {
    const {
      data: data
    } = await this.$axios.post(`/area-reservations`, {
      data: params
    })
    commit('setSingleReservation', data.data)
  },
  async delete({
    commit,
    state
  }, id) {
    await this.$axios.delete(`/zones/${state.zone.id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  },
  setRule({
    commit,
  }, rule) {
    commit('setRule', rule)
  },
  removeRule({
    commit,
  }, index) {
    commit('removeRule', index)
  },

  clear({
    commit
  }) {
    commit('set', {
      rules: []
    })
  }
}

export const mutations = {
  updateField,
  set(state, zone) {
    state.zone = zone
  },
  setRule(state, rule) {
    state.zone.rules.push(rule)
  },
  removeRule(state, index) {
    state.zone.rules.splice(index, 1)
  },
  setSingleReservation(state, reservation) {
    state.areaReservations.data.push(reservation)
  },
  setAreaList(state, areaList) {
    state.areaReservations = areaList
  },
  setList(state, data) {
    state.zones = data
  }
}
