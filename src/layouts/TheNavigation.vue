<template>
  <v-list nav subheader>
    <v-list-item link :to="`/task/${index}`">
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
    },
    index: {
      type: Number
    }
  },
  filters: {
    slashRemover(value) {
      var string = value
      return string.split('/').join('-')
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-input--selection-controls
    padding: 0
    margin: 0
</style>