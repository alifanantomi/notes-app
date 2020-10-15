export default {
  addTask: ({ commit }, payload) => {
    commit('appendTask', payload)
  },

  updateTask: ({ commit }, payload) => {
    commit('updateTask', payload)
  }
}