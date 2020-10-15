<template>
  <v-card class="rounded-lg mb-3 mx-lg-auto mx-md-auto mx-sm-auto mx-auto" min-width="343" max-width="343" outlined>
    <!-- Task.Categories -->
    <div class="categories-wrapper d-flex justify-space-between align-center">
      <v-card-text class="text-caption text-capitalize pb-0" v-if="task.category">
        <v-chip label small>{{task.category}}</v-chip>
      </v-card-text>
      <!-- <v-card-text class="text-right">1 hour ago</v-card-text> -->
    </div>
    <!-- Task.Title -->
    <v-card-title class="" v-text="task.title"></v-card-title>
    <!-- Task.Desc -->
    <v-card-subtitle>
      <v-clamp autoresize :max-lines="1">{{ task.content[1].content[0].text }}</v-clamp>
    </v-card-subtitle>
    <!-- Task.Todos -->
    <!-- <v-list-item 
      v-for="todo in slicedTodos" 
      :key="todo.title"
      link
      dense>
      <v-list-item-content>
        <v-list-item-title>
          <v-checkbox dense hide-details v-model="todo.complete" :label="`${todo.title}`"></v-checkbox>  
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item> -->
    <!-- Task.Progress -->
    <v-card-text>
      <v-row no-gutters class="justify-space-between mb-1">
        <span class="text-caption">Progress</span>
        <span class="text-caption">{{task.progress}}%</span>
      </v-row>
      <div class="progress-bar-wrapper">
        <v-progress-linear :value="task.progress + 10" color="grey" height="4" rounded></v-progress-linear>
      </div>
    </v-card-text>
    <v-divider class="my-1"></v-divider>
    <!-- Task.Perticipant -->
    <div class="d-flex justify-space-between align-center mx-4 my-1">
      <!-- <v-row no-gutters>
        <v-btn 
          class="profile-bar mr-3" 
          icon 
          v-for="participant in task.participants"
          :key="participant.name">
          <v-img src="@/assets/images/person.jpg" :alt="participant.image" class="username-img rounded-circle" max-height="40" max-width="40" ></v-img>
        </v-btn>
      </v-row> -->
      <span class="text-body-2">1 hour ago</span>
      <div class="actions-wrapper d-flex align-center">
        <v-btn icon :to="`${task.id}`"><v-icon small>mdi-eye</v-icon></v-btn>
        <v-btn icon><v-icon small>mdi-pencil</v-icon></v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
//line truncater plugin for task.Desc
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
  computed: {
    // grab first three of todos array
    slicedTodos: function() {
      return this.task.todos.slice(0, 3)
    },
  }
}
</script>

<style lang="sass" scoped>

  .v-input--selection-controls
    padding: 0
    margin: 0
</style>