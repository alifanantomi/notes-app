<template>
  <section class="home-wrapper">
    <v-app-bar flat fixed height="58">
      <v-app-bar-nav-icon class="d-md-none d-lg-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-h6 d-none d-md-inline d-lg-inline pl-0">Task app</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="Search task"
        color="dark"
        v-model="query"
        hide-details
        outlined
        dense
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn class="profile-bar" icon>
        <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="30" max-width="30" ></v-img>
      </v-btn>
    </v-app-bar>
    <div class="content-header-wrapper d-md-flex d-sm-flex justify-space-between align-center mx-md-2 py-3">
      <span class="text-subtitle-1 d-none d-sm-inline d-md-inline d-lg-inline">{{ selectedCategories }} Task</span>
      <!-- filter input select -->
      <div class="">
        <v-select
          :items="categories"
          v-model="selectedCategories"
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
    <div class="card-list-wrapper">
      <card-task 
        v-for="(task, index) in filteredTask"
        :key="index"
        class="list-complete-item"
        :index="index"
        :task="task"></card-task>
    </div>
  </section>
</template>

<script>
import CardTask from '@/components/CardTask.vue'
import { mapState } from 'vuex'
import categoriesItems from '@/data/Categories'
// import { filter } from 'vue/types/umd';

export default {
  name: 'Home',
  components: {
    CardTask,
  },
  data() {
    return {
      categoriesItems,
      categories: [],
      selectedCategories: 'All',
      tasks: [],
      query: ''
    }
  },
  created() {
    this.categoriesItems.forEach(categories => {
      this.categories.push(categories.title)
    });
  },
  computed: {
    ...mapState([
      'Task'
    ]),
    // return task categories based
    filteredTask() {
      var queryCheck = this.$route.query.search
      let task = this.Task
      let categories = this.selectedCategories
      if (queryCheck) {
        task = task.filter((t) => {
          return t.title.toLowerCase().indexOf(queryCheck.toLowerCase()) !== -1
        })
      }
      if (this.selectedCategories && this.selectedCategories !== 'All') {
        task = task.filter((t) => {
          return t.category === categories
        })
      }
      return task
    }
  },
  watch: {
    query: function() {
      if (this.query == '') {
        this.$router.push({name: 'Home'})
      }else{
        this.$router.push({name: 'Home', query: { search: this.query}})
      }
    }
  },
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
