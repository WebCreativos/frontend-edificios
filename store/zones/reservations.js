import {
    getField,
    updateField
  } from 'vuex-map-fields';
  var qs = require('qs');
  export const state = {
    reservation: {},
    reservations: {
      data:[]
    },
  }
  
  
  export const getters = {
    getField,
    getList(state) {
      var reservations = _.cloneDeep(state.reservations)
      return reservations
    },
    get(state) {
      return state.reservation
    }
  }
  
  export const actions = {
    async findAll({
      commit
    },params = {}) {
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
      commit('setList', data)
    },
    async add({
      commit,
      state
    },params) {
      const {
        data: data
      } = await this.$axios.post(`/area-reservations`, {data:params})
      commit('set', data.data)
    },
    clear({
      commit
    }) {
      commit('set', {})
    }
  }
  
  export const mutations = {
    updateField,
    set(state, zone) {
      state.reservation = zone
    },
    setSingle(state, reservation) {
      state.reservations.data.push(reservation)
    },
    setList(state, areaList) {
      state.reservations = areaList
    },
  }
  