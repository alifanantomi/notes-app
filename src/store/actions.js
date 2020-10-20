export default {
  addTask: ({ commit }, payload) => {
    commit('appendTask', payload)
  },

  updateTask: ({ commit }, payload) => {
    commit('updateTask', payload)
  },

  removeTask: ({ commit}, payload) => {
    commit('removeTask', payload)
  }
}