<template>
  <section class="home-wrapper">
    <div class="content-header-wrapper mx-2 py-3">
      <span>Total task: {{ countTask }}</span>
      <div class="d-flex align-center">
        <span class="text-subtitle-1 mr-3">Filters</span>
        <v-select
          :items="categories"
          label="All"
          hide-details
          single-line
          solo
          flat
        ></v-select>
      </div>
    </div>
    <div class="card-list-wrapper d-flex flex-wrap">
      <card-todo 
        v-for="(task, index) in Task"
        :key="index"
        :index="index"
        :task="task"></card-todo>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import CardTodo from '@/components/CardTodo.vue'

export default {
  name: 'Home',
  components: {
    CardTodo,
  },
  data() {
    return {
      categories: ['All', 'Design', 'Programming', 'Study'],
    }
  },  
  computed: {
    // grab list of task  from state
    ...mapState([
      'Task'
    ]),
    countTask: function() {
      return this.Task.length;
    }
  }
}
</script>

<style lang="sass" scoped>
  .home-wrapper
    padding: 0 20px 0 20px

  @media (min-width: 453px) and (max-width: 768px)
    .home-wrapper
      padding: 0 20px 0 20px
  
  @media (max-width: 453px)
    .home-wrapper
      padding: 0

</style>
