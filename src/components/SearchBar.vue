<template>
  <v-autocomplete
    class="mr-md-4"
    v-model="select"
    placeholder="Search task"
    color="dark"
    hide-details
    hide-no-data
    append-icon
    outlined
    dense
  ></v-autocomplete>
</template>

<script>
export default {
  props: {

  }
}
</script>