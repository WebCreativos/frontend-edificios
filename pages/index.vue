<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:title>
        Inicio
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" to="/properties/create">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR APARTAMENTO
        </v-btn>
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-md-12 col-12">
        <propertiesListComponent elevation="6" title @changePage="search.pagination.page = $event" :data="data">
        </propertiesListComponent>
      </v-col>
      <v-col class="col-md-7">
        <cardsCashFlowComponent></cardsCashFlowComponent>
      </v-col>
      <v-col class="col-md-5 col-12">
        <cardsAlquileresExpensasComponent></cardsAlquileresExpensasComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'IndexPage',
    mounted() {
      this.getProperties()
    },
    methods: {
      getProperties() {
        console.log("aca")
        this.$store.dispatch('apartments/findAll', {populate:'*', pagination:{limit:5},sort:'id:desc'})
      },
    },
    computed: {
      data() {
        return this.$store.getters['apartments/getList'];
      }
    },

  }

</script>

<style>
</style>
