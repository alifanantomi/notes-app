<template>
  <div class="detail px-3">
    <div class="detail__page-control d-flex justify-start align-center py-4">
      <v-btn small text class="text-none text-body-2 px-2" color="rgba(255, 255, 255, 0.4)">
        <v-icon left class="mr-1">mdi-image</v-icon>
        Edit
      </v-btn>
    </div>

    <div class="detail__content" v-html="showArticle"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import TitleToHtml from './custom-extensions/TitleToHtml'

export default {
  data() {
    return {
      taskId: this.$route.params.task
    }
  },
  computed: {
    ...mapState([
      'Task'
    ]),

    showArticle() {
      return this.jsonToHtml(this.Task[this.taskId])
    }
  },
  methods: {
    jsonToHtml: function(j) {
      const Renderer = require("prosemirror-to-html-js").Renderer;
      const renderer = new Renderer();
      let result

      // renderer.addNode(TitleToHtml)

      result = renderer.render(j)

      return result
    },
  }
}
</script>

<style lang="scss" scoped>
</style>