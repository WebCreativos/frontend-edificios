var qs = require('qs');
export const state = {
  news: [],
}


export const getters = {
  getList(state) {
    return state.news
  }
}

export const actions = {
  async findAll({ commit }) {
    const {
      data: data
    } = await this.$axios.get(`/news`,{
      paramsSerializer: params => {
        return qs.stringify(params,{arrayFormat: 'brackets'})
      }
    })
    commit('set', data)
  },
  async add({commit},nw) {
    const {
      data: data
    } = await this.$axios.post(`/news`, {data:nw})
    commit('setSingle', data)
  },
  async delete({commit},id) {
    await this.$axios.delete(`/news/${id}`)
    setTimeout(() => {
      commit('delete', id)
    }, 3000);
  }

}

export const mutations = {
  set(state, news) {
    state.news = news
  },
  delete(state, id) {
    state.news.data = state.news.data.filter((n) => n.id !== id)
  },
  setSingle(state, data) {
    state.news.data.push(data.data)
  }

}
