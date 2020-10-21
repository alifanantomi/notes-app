<template>
  <v-list nav subheader dense>
    <v-list-item link :to="`${index}` | linkFormat">
      <v-list-item-content>
        <v-list-item-title class="text-body-2" v-text="task.title"></v-list-item-title>
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
  data() {
    return {
      title: ''
    }
  },
  filters: {
    linkFormat(str) {
      str = str.replace(/\W+/g, '-')
      return str
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-input--selection-controls
    padding: 0
    margin: 0
</style>