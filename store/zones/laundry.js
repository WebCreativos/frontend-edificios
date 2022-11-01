import {
    getField,
    updateField
  } from 'vuex-map-fields';
  var qs = require('qs');
  const _ = require('lodash');
  export const state = {
    reservations: {
      data:[]
    },
    laundry:{}
  }
  
  const PREFIX = "reservation-laundries"
  
  export const getters = {
    getList(state) {
      var reservations = _.cloneDeep(state.reservations)
      return reservations
    },
    get(state){
      return state.laundry
    }
  }
  
  export const actions = {
    async find({
      commit
    }) {
      const {
        data: data
      } = await this.$axios.get(`/${PREFIX}/`, {
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
    },params) {
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
      } = await this.$axios.get(`/${PREFIX}/`, {
        params: params,
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
    }, params) {
      await this.$axios.post(`/${PREFIX}/`, {data:params})
    },
  
  
    async delete({
      commit,
      state
    }, id) {
      await this.$axios.delete(`/${PREFIX}/${state.laundry.id}`)
      setTimeout(() => {
        commit('delete', id)
      }, 3000);
    },
    clear({
      commit
    }) {
      commit('set', {})
    }
  }
  
  export const mutations = {
    updateField,
    set(state, laundry) {
      state.laundry = laundry
    },
    setList(state, data) {
      state.reservations = data
    }
  }
  