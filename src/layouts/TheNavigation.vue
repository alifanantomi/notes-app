<template>
  <v-list nav subheader>
    <v-list-item link>
      <v-list-item-content>
        <v-list-item-title v-text="task.title"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    task: {
      type: Object
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