<template>
  <section class="home-wrapper">
    <div class="content-header-wrapper d-md-flex d-sm-flex justify-space-between align-center mx-md-2 py-3">
      <span class="text-subtitle-1 d-none d-sm-inline d-md-inline d-lg-inline">{{ categories }} Task</span>
      <!-- filter input select -->
      <div class="">
        <v-select
          :items="categoriesItems"
          v-model="categories"
          full-width
          hide-details
          single-line
          dense
          outlined
          flat
        ></v-select>
      </div>
    </div>
    <!-- card component -->
    <div class="card-list-wrapper d-flex flex-wrap">
      <card-task 
        class="list-complete-item"
        v-for="(task, index) in filteredTask"
        :key="index"
        :index="index"
        :task="task"></card-task>
    </div>
  </section>
</template>

<script>
import CardTask from '@/components/CardTask.vue'
import { mapState } from 'vuex'
// import { filter } from 'vue/types/umd';

export default {
  name: 'Home',
  components: {
    CardTask,
  },
  data() {
    return {
      categoriesItems: ['All', 'Design', 'Programming', 'Study'],
      categories: 'All',
      tasks: []
    }
  },
  computed: {
    ...mapState([
      'Task'
    ]),
    // return task categories based
    filteredTask() {
      var queryCheck = this.$route.query.search
      let task = this.Task
      let categories = this.categories
      if (queryCheck) {
        task = task.filter((t) => {
          return t.title.toLowerCase().indexOf(queryCheck.toLowerCase()) !== -1
        })
      }
      if (this.categories && this.categories !== 'All') {
        task = task.filter((t) => {
          return t.categories === categories
        })
      }
      return task
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
