<template>
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
</template>