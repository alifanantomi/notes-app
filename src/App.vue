<template>
  <v-app>
    <v-sheet height="100%" class="overflow-hidden" style="position: relative;">
      <!-- TopBar -->
      <v-app-bar v-if="currentLocation != '/new'" flat fixed height="58">
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
        <v-btn class="profile-bar" @click="cleanTask" icon>
          <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="30" max-width="30" ></v-img>
        </v-btn>
      </v-app-bar>
      <v-app-bar v-else flat fixed height="52">
        <v-btn icon link href="/"><v-icon>mdi-chevron-left</v-icon></v-btn>
        <span class="text-body-1">New Task</span>
        <v-spacer></v-spacer>
        <v-btn class="profile-bar" @click="cleanTask" icon>
          <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="30" max-width="30" ></v-img>
        </v-btn>
      </v-app-bar>

      <!-- SideBar -->
      <v-navigation-drawer clipped fixed v-model="drawer" width="230" mobile-breakpoint="769" class="navigation-wrapper">
        <v-list>
          <v-subheader class="text-capitalize text-body-2 font-weight-bold">Favorites</v-subheader>
          <!-- list of favorite -->
          <the-navigation
            v-for="(task, index) in getFavorite" 
            :key="index"
            :task="task"
            :index="index"
            link></the-navigation>
          <v-subheader class="text-capitalize text-body-2 font-weight-bold">All Task</v-subheader>
          <!-- list of all task -->
          <the-navigation 
            v-for="(task, index) in Task" 
            :key="task.title"
            :index="index"
            :task="task"
            link></the-navigation>
        </v-list>
        <template v-slot:append>
          <v-list-item link href="/new">
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
import { mapState } from 'vuex';

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
      currentLocation: window.location.pathname
    }
  },
  mounted() {
    this.$store.commit('getTask')
  },
  created () {
    this.$vuetify.theme.dark = true
    this.getFavorite
  },
  computed: {
    ...mapState([
      'Task'
    ]),
    // get favorite list for navigation
    getFavorite: function() {
      return this.Task.filter(function (task) {
        return task.favorite
      });
    }
  },
  methods: {
    cleanTask() {
      localStorage.clear()
      window.location.reload(true);
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