<template>
  <v-container>
    <HeadersGeneralComponent>
      <template v-slot:title>
        Visitas
      </template>
    </HeadersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <PropertiesVisitsComponent :apartment="apartment" @update="getVisits()"></PropertiesVisitsComponent>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
  var qs = require('qs');
  export default {
    data() {
      return {
        items: {},
        apartment:this.$auth.user.data.apartment
      }
    },
    created() {
    },
    methods: {
    }
  }

</script>

<style>

</style>
