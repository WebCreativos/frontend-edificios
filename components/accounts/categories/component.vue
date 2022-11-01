<template>
  <v-row no-gutters class="flex-nowrap overflow-auto py-3">
    <accountsCategoriesCardComponent v-for="(item,index) in items" :icon="item.icon.name" :to="item.to" :color="item.icon.color" :key="'c'+index">
      {{item.name}}
    </accountsCategoriesCardComponent>
  </v-row>
</template>

<script>
  export default {
    props:{
        items: {
            type: Array,
            required: true
        }
    }
  }

</script>

<style>

</style>
