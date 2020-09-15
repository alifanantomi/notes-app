<template>
  <section class="home-wrapper">
    <div class="content-header-wrapper pt-4">
      <SearchBar></SearchBar>
      <div class="d-flex justify-space-between align-center py-4">
        <v-select
          :items="items"
          label="Categories"
          hide-details
          single-line
          solo
          flat
        ></v-select>
      </div>
    </div>
    <div class="card-list-wrapper d-flex flex-wrap">
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
      <CardTodo></CardTodo>
    </div>
  </section>
</template>

<script>
import CardTodo from '@/components/CardTodo.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    CardTodo,
    SearchBar
  },
  data() {
    return {
      items: ['Design', 'Programming', 'Study'],
      category: ''
    }
  },
  methods: {
    getCategory(value) {
      this.category = value
      return console.log(this.category);
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
