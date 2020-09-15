<template>
  <v-card link to="/" class="rounded-lg mb-3 mx-lg-2 mx-md-auto mx-sm-auto mx-auto" max-width="335" outlined>
    <v-card-title>Intro to web design</v-card-title>
    <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam magnam dolores expedita ullam eaque inventore harum perspiciatis, maiores quo optio voluptate magni deserunt possimus sit dolor? Inventore magnam sunt quos!</v-card-text>
    <v-card-text>
      <v-row no-gutters class="justify-space-between mb-1">
        <span class="text-caption">Progress</span>
        <span class="text-caption">30%</span>
      </v-row>
      <div class="progress-bar-wrapper">
        <v-progress-linear value="30" color="primary" height="4" rounded></v-progress-linear>
      </div>
    </v-card-text>
      <v-divider class="my-2"></v-divider>
    <v-card-text class="d-flex justify-space-between align-center">
      <v-row no-gutters>
        <v-btn class="profile-bar mr-3" icon>
          <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="40" max-width="40" ></v-img>
        </v-btn>
        <v-btn class="profile-bar" icon>
          <v-img src="@/assets/images/person.jpg" alt="username" class="username-img rounded-circle" max-height="40" max-width="40" ></v-img>
        </v-btn>
      </v-row>
      <span>1 hour ago</span>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
  .progress
    margin-bottom: 5em
</style>