<template>
  <v-list nav subheader>
    <v-list-group 
      v-for="item in items" 
      :key="item.title">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </template>
      <div v-if="item.todos.length < 1">
        <v-list-item link>
          <v-list-item-title>Add a todo</v-list-item-title>
          <v-icon>mdi-plus</v-icon>
        </v-list-item>
      </div>
      <div v-else>
        <v-list-item 
          v-for="todo in item.todos" 
          :key="todo.title"
          link>
          <v-list-item-content>
            <v-list-item-title>
              <v-checkbox dense hide-details v-model="todo.complete" :label="`${todo.title}`"></v-checkbox>  
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Design System',
          todos: [
            { title: 'List Item 1', complete: false },
            { title: 'List Item 2', complete: false },
            { title: 'List Item 3', complete: false },
          ],
        },
        {
          title: 'Intro to Web Design',
          todos: [],
        },
      ],
    }
  },
  filters: {
    stripRemover(value) {
      var string = value
      return string.replace(/-/ig, ' ')
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-input--selection-controls
    padding: 0
    margin: 0
</style>