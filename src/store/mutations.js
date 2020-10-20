export default {
  getTask(state) {
    if (localStorage.getItem('tasks')) state.Task = JSON.parse(localStorage.getItem('tasks'));
  },

  appendTask: (state, payload) => {
    state.Task.push(payload)
  },

  updateTask: (state, payload) => {
    state.Task.forEach(task => {
      if (task.id == payload.id) {
        Object.assign(task, payload)
      }
    });
  },

  removeTask: (state, payload) => {
    state.Task.splice(payload, 1);
  }
}