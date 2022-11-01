<template>
  <v-container>
    <headersGeneralComponent>
        <template v-slot:title>
          Mis facturas
        </template>
      </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <AccountingPaymentsComponent readonly outlined class="mt-3 elevation-1"
          :data="invoices">
        </AccountingPaymentsComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    created() {
      this.getPayments()
    },
    methods: {
      getPayments() {
        this.$store.dispatch('accounting/findAll',{
          filters:{
            apartment:this.$auth.user.data.apartment.id
          }
        })
      },
    },
    computed: {
      invoices() {
        return this.$store.getters['accounting/getList']
      }
    }
  }

</script>

<style>

</style>
