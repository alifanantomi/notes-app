<template>
  <v-app>
    <v-sheet height="100%" class="overflow-hidden" style="position: relative;">
      <v-app-bar flat outlined fixed>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-title class="text-h6">Task app</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="profile-bar" icon>
          <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="30" max-width="30" ></v-img>
        </v-btn>
      </v-app-bar>

      <!-- <v-row no-gutters> -->
        <v-navigation-drawer clipped fixed v-model="drawer" mobile-breakpoint="769" class="navigation-wrapper">
          <v-list>
            <v-subheader class="text-capitalize font-weight-bold">Favorites</v-subheader>
            <TheNavigation></TheNavigation>
            <v-subheader class="text-capitalize font-weight-bold">All Task</v-subheader>
            <TheNavigation></TheNavigation>
          </v-list>
          <v-list-item link>
            <v-list-item-title>Add a task</v-list-item-title>
            <v-icon>mdi-plus</v-icon>
          </v-list-item>
          <template v-slot:append>
            <v-list-item link>
              <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
          </template>
        </v-navigation-drawer>
        <div class="list-wrapper">
          <router-view></router-view>
        </div>
      <!-- </v-row> -->
    </v-sheet>
  </v-app>
</template>

<script>
import TheNavigation from '@/layouts/TheNavigation';

export default {
  name: 'App',
  components: {
    TheNavigation,
  },
  data () {
    return {
      drawer: null,
    }
  }
};
</script>

<style lang="sass" scoped>
  .v-app-bar
    background-color: #FFFFFF !important

  .navigation-wrapper
    padding-top: 64px
    margin: auto

  .list-wrapper
    padding: 64px 0 0 256px

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
      padding: 64px 20px 0 20px
</style>
