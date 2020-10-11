export default {
  getTask(state) {
    if (localStorage.getItem('tasks')) state.Task = JSON.parse(localStorage.getItem('tasks'));
  },

  appendTask: (state, tasks) => {
    console.log('appending');
    state.Task.push(tasks)
  }
}