import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');
import _ from 'lodash'
import moment from 'moment'
export const state = {
  reservation: {},
  reservations: {
    data: []
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
    },
  }
    export const actions = {
      async findAll({
        commit
      }, params = {}) {
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
      }, params) {
        const {
          data: data
        } = await this.$axios.post(`/area-reservations`, {
          data: params
        })
        commit('set', data.data)
      },
      async update({
        commit,
        state
      }, {id,data}) {
        return await this.$axios.put(`/area-reservations/${id}`,{
          data:data
        })
        
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
        state.reservation = zone
      },
      setSingle(state, reservation) {
        state.reservations.data.push(reservation)
      },
      setList(state, areaList) {
        state.reservations = areaList
      },
    }
