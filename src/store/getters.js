export default {
  getIndex: state => {
    return state.Task.length -1
  },

  getTask: (state) => {
    return state.Task
  }
}