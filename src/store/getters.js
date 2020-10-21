export default {
  getIndex: state => {
    return state.Task.length -1
  },

  getTask: (state, index) => {
    return state.Task[index].content
  }
}