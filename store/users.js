import {
  getField,
  updateField
} from 'vuex-map-fields';
var qs = require('qs');

export const state = () => ({
  users: [],
  user: {
    name: '',
    doc: '',
    username: '',
    type: 'owner',
  }
})
export const getters = {
  getField,
  get(state) {
    return state.user;
  },
  getList(state) {
    return state.users;
  }

}
export const actions = {
  set({
    commit
  }, data) {
    commit('set', data)
  },
  async findAll({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/users/`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    commit("setList", data)
  },
  async find({
    commit
  }, query) {
    const {
      data: data
    } = await this.$axios.get(`/users/`, {
      params: {
        filters: query
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    if (data.data) {
      return data.data
    } else {
      return {
        data: {
          attributes: {}
        }
      }
    }
  },
  async create({
    state
  }, {
    type: type
  }) {
    let email = `${state.user.username}@foresttower.com`
    try {
      const {
        data: data
      } = await this.$axios.post('/users', {
        ...state.user,
        email: email,
        type: type,
        password: state.user.username
      })
      return {
        data: data
      }

    } catch (error) {
      return {
        data: false
      }
    }
  },
  async update({
    state
  }) {
    try {
      const {
        data: data
      } = await this.$axios.put(`/users/${state.user.id}`, state.user)
      return {
        data: data
      }

    } catch (error) {
      return {
        data: false
      }
    }
  },
  clear({
    commit
  }) {
    commit('set', {
      name: '',
      doc: '',
      username: '',
      type: 'owner',
    })
  },
  async checkIfExists({}, username) {
    const {
      data: data
    } = await this.$axios.get(`/users/`, {
      params: {
        filters: {
          username: username
        },
      },
      paramsSerializer: params => {
        return qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      }
    })
    return data.length > 0

  },
  async login({}, {
    username,
    password
  }) {

    return new Promise(async (resolve, reject) => {
      this.$auth.loginWith('local', {
        data: {
          identifier: username,
          password: password
        }
      }).then((response) => {
        console.log(response)
        resolve(response)
      }).catch((error) => {
        console.log(error)
        reject(error)
      })
    })
  }

}
export const mutations = {
  updateField,
  set(state, data) {
    state.user = {
      ...state.user,
      ...data
    }
  },
  setList(state, data) {
    console.log(data)
    state.users = data
  }

}
