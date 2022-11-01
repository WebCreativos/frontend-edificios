<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Mis cuentas corrientes
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <propertiesCheckingAccountsComponent class="elevation-6 rounded-xl"  :apartment="apartment"></propertiesCheckingAccountsComponent>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    computed: {
        apartment(){
            return this.$store.getters["apartments/get"]
        }
    }
  }

</script>

<style>

</style>
