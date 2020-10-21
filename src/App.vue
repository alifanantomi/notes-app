<template>
  <v-app>
    <v-sheet height="100%" class="overflow-hidden" style="position: relative;">
      <!-- TopBar -->

      <!-- SideBar -->
      <v-navigation-drawer clipped fixed v-model="drawer" width="230" mobile-breakpoint="769" class="navigation-wrapper">
        <v-list>
          <!-- <v-subheader class="text-capitalize text-body-2 font-weight-bold">Favorites</v-subheader> -->
          <!-- list of favorite -->
          <!-- <the-navigation
            v-for="(task, index) in getFavorite" 
            :key="index"
            :task="task"
            :index="index"
            link></the-navigation> -->
          <v-subheader class="text-capitalize text-body-2 font-weight-bold">All Task</v-subheader>
          <!-- list of all task -->
          <the-navigation 
            v-for="(task, index) in Task" 
            :key="task.id"
            :index="index"
            :task="task"
            link></the-navigation>
        </v-list>
        <template v-slot:append>
          <v-list-item @click="newTask">
            <v-list-item-title>Add a task</v-list-item-title>
            <v-icon small>mdi-plus</v-icon>
          </v-list-item>
        </template>
      </v-navigation-drawer>
      <!-- content view -->
      <div class="list-wrapper">
        <router-view></router-view>
      </div>
    </v-sheet>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Data from "./data/Task";

import TheNavigation from '@/layouts/TheNavigation';
// import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'App',
  components: {
    TheNavigation,    
    // SearchBar,
  },
  data() {
    return {
      drawer: null,
      query: '',
      currentLocation: window.location.pathname,
    }
  },
  mounted() {
    this.$store.commit('getTask')
  },
  created () {
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'appendTask') {
        localStorage.setItem('tasks', JSON.stringify(state.Task))
      }
    })

    this.$vuetify.theme.dark = true
    this.getFavorite
  },
  computed: {
    ...mapState([
      'Task'
    ]),
    ...mapGetters([
      'getIndex'
    ]),
    // get favorite list for navigation
    // getFavorite: function() {
    //   return this.Task.filter(function (task) {
    //     return task.favorite
    //   });
    // }
  },
  methods: {
    ...mapActions([
      'addTask'
    ]),
    cleanTask() {
      localStorage.clear()
    },
    newTask() {
      let content = Data.content
      
      Data.id = Math.floor((Math.random() * 10000) + 1)
      Data.title = 'Untitled'
      Data.category = '',
      Data.progress = 10,
      Data.favorite = false

      const { id, title, category, progress, favorite } = Data
      const payload = {
        id, 
        title,
        category,
        progress,
        favorite,
        content
      }

      this.addTask(payload)
      this.$router.push({name: 'Task', params: {task: this.getIndex}})
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
};
</script>

<style lang="sass" scoped>
  .v-app-bar
    background-color: #FFFFFF

  .navigation-wrapper
    padding-top: 58px
    margin: auto

  .list-wrapper
    padding: 72px 0 0 230px

  @media (min-width: 453px) and (max-width: 768px)
    .navigation-wrapper
      padding: 0

    .list-wrapper
      padding-left: 0
      margin: auto
  
  @media (max-width: 453px)
    .navigation-wrapper
      padding: 0

    .list-wrapper
      padding: 58px 15px 0 15px
</style>