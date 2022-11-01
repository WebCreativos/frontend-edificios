import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');
var easyinvoice = require('easyinvoice');

export const state = {
  payments: {},
  payment: {
    type: 'expenses',
    amount: 0,
    status: 'pending',
    currency: 'USD',
    address: '',
    comments: '',
    name: '',
    doc: '',
  },
}


export const getters = {
  getField,
  getList(state) {
    return state.payments
  },
  get(state) {
    return state.payment
  }
}

export const actions = {
  async find({
    commit
  }) {
    const {
      data: data
    } = await this.$axios.get(`/payments`, {
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
      params.filters = {
        building: this.$auth.user.building.id
      }
    } else {
      params.filters = {
          building: this.$auth.user.building.id
      }
    }


    const {
      data: data
    } = await this.$axios.get('/payments', {
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
    state,
    dispatch
  }) {
    const {
      data: data
    } = await this.$axios.post(`/payments`, {
      data: {
        ...state.payment,
        building: this.$auth.user.building.id
      }
    })
    commit('set', {
      ...data.data,
      id: data.data.id
    })
    dispatch('clear')
    return data.data.id
  },
  async changeStatus({
    commit,
    state
  }, id) {
    const {
      data: data
    } = await this.$axios.put(`/payments/` + id, {
      data: {
        status: 'payed'
      }
    })
  },


  async delete({
    commit,
    state
  }, id) {
    await this.$axios.delete(`/payments/${state.payment.id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  },
  clear({
    commit
  }) {
    commit('set',  {
      type: 'expenses',
      amount: 0,
      status: 'pending',
      currency: 'USD',
      address: '',
      comments: '',
      name: '',
      doc: '',
    })
  },
  generateInvoice({state},data) {
    let invoice = JSON.parse(JSON.stringify(data));
    easyinvoice.createInvoice(invoice, function (result) {
      easyinvoice.download('myInvoice.pdf', result.pdf);
      //	you can download like this as well:
      //	easyinvoice.download();
      //	easyinvoice.download('myInvoice.pdf');   
  });
    }
}

export const mutations = {
  updateField,
  set(state, zone) {
    state.payment = zone
  },
  setAreaList(state, areaList) {
    state.payment = areaList
  },
  setList(state, data) {
    state.payments = data
  }
}
