export default {
  addTask: ({ commit }, payload) => {
    commit('appendTask', payload)
  }
}