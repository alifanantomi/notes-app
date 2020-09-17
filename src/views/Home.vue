<template>
  <section class="home-wrapper">
    <div class="content-header-wrapper mx-2 py-3">
      <div class="d-flex align-center">
        <span class="text-subtitle-1 mr-3">Filters</span>
        <v-select
          :items="categoriesItems"
          v-model="categories"
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
        v-for="(task, index) in filteredTask"
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
      categoriesItems: ['All', 'Design', 'Programming', 'Study'],
      categories: 'All'
    }
  },
  computed: {
    // grab list of task  from state
    ...mapState([
      'Task'
    ]),
    filteredTask: function() {
      return this.filters(this.categories)
    }
  },
  methods: {
    filters: function(categories) {
      return this.Task.filter(function(task) {
        if (categories == 'All') {
          return task
        }else{
          return task.categories == categories
        }
      })
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
