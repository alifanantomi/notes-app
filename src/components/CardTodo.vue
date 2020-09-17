<template>
  <v-card class="rounded-lg mb-3 mx-lg-2 mx-md-auto mx-sm-auto mx-auto" max-width="335" outlined>
    <v-card-text class="text-caption text-capitalize">
      <v-chip label small>{{task.categories}}</v-chip>
    </v-card-text>
    <!-- Task.Title -->
    <v-card-title class="pt-0" v-text="task.title"></v-card-title>
    <!-- Task.Desc -->
    <v-card-subtitle>
      <v-clamp autoresize :max-lines="3">{{ task.desc }}</v-clamp>
    </v-card-subtitle>
    <!-- Task.Todos -->
    <v-list-item 
      v-for="todo in slicedTodos" 
      :key="todo.title"
      link
      dense>
      <v-list-item-content>
        <v-list-item-title>
          <v-checkbox dense hide-details v-model="todo.complete" :label="`${todo.title}`"></v-checkbox>  
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <!-- Task.Progress -->
    <v-card-text>
      <v-row no-gutters class="justify-space-between mb-1">
        <span class="text-caption">Progress</span>
        <span class="text-caption" v-text="task.progress"></span>
      </v-row>
      <div class="progress-bar-wrapper">
        <v-progress-linear :value="task.progress + 10" color="primary" height="4" rounded></v-progress-linear>
      </div>
    </v-card-text>
    <v-divider class="my-2"></v-divider>
    <!-- Task.Perticipant -->
    <v-card-text class="d-flex justify-space-between align-center">
      <v-row no-gutters>
        <v-btn 
          class="profile-bar mr-3" 
          icon 
          v-for="participant in task.participants"
          :key="participant.name">
          <v-img src="@/assets/images/person.jpg" :alt="participant.image" class="username-img rounded-circle" max-height="40" max-width="40" ></v-img>
        </v-btn>
      </v-row>
      <span>1 hour ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
//line truncater plugin for task.desc
import VClamp from 'vue-clamp'

export default {
  components: {
    VClamp
  },
  props: {
    task: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  },
  data: function() {
    return{
      visibility: 'all',
      lines: 2
    }
  },
  computed: {
    slicedTodos: function() {
      return this.task.todos.slice(0, 3)
    }
  }
}
</script>

<style lang="sass" scoped>

  .v-input--selection-controls
    padding: 0
    margin: 0
</style>