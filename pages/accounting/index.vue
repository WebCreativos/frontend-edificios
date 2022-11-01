<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Contabilidad
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="paymentsModal = true">
          NUEVA FACTURA&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>

    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <cardsCashFlowComponent></cardsCashFlowComponent>
      </v-col>
      <v-col class="col-12">
        <accountingPaymentsComponent  elevation="6" title :data="paymentList"></accountingPaymentsComponent>
      </v-col>
    </v-row>
    <accountingCreatePaymentsComponent v-model="paymentsModal"></accountingCreatePaymentsComponent>
  </v-container>
</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js'
  import moment from 'moment'
  export default {
    mixins: [dateFunctions],
    data() {
      return {
        paymentsModal: false,
        headers: [{
          text: 'Fecha',
          value: 'createdAt'
        }, {
          text: 'Tipo',
          value: 'type'
        }, {
          text: 'Nombre / Razon social',
          value: 'name'
        }, {
          text: 'Moneda',
          value: 'currency'
        }, {
          text: 'Monto',
          value: 'amount'
        }, {
          text: 'Cambiar estado',
          value: 'change_status'
        }, {
          text: 'Generar factura',
          value: 'invoice'
        }]
      }
    },
    created() {
      this.getPayments()
    },
    filters: {
      formatType(value) {
        switch (value) {
          case 'expenses':
            return 'Expensas'
          case 'suppliers':
            return 'Pago a proveedores / gastos'
        }
      },
    },
    methods: {
      getPayments() {
        this.$store.dispatch('accounting/findAll')
      },
    },
    computed: {
      paymentList() {
        return this.$store.getters['accounting/getList']
      }
    }
  }

</script>

<style>

</style>
