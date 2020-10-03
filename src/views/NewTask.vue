<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-speed-dial
        v-model="fab"
        bottom
        right
        direction="left"
        fixed
        transition="slide-y-reverse-transition"
      >
        <template v-slot:activator>
          <v-btn
            v-model="fab"
            color="blue darken-2"
            dark
            fab
          >
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn
          fab
          dark
          small
          color="green"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="indigo"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
  </div>
</template>
