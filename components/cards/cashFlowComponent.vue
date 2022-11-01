<template>
  <generalCardComponent elevation="6">
    <GeneralCardTitleComponent class="primary white--text">
      CashFlow
    </GeneralCardTitleComponent>
    <v-card-text class="my-3">
      <v-row>
        <v-col class="col-md-12 col-12">
          <GeneralCardMiniComponent>
            <template v-slot:title>
              $ {{inPayments}}
            </template>
            <template v-slot:subtitle>
              Ingresos
            </template>
          </GeneralCardMiniComponent>
        </v-col>
        <v-col class="col-md-6 col-12">
          <GeneralCardMiniComponent color="red">
            <template v-slot:title>
              $ {{outPayments}}
            </template>
            <template v-slot:subtitle>
              Gastos
            </template>

          </GeneralCardMiniComponent>
        </v-col>
        <v-col class="col-md-6 col-12">
          <GeneralCardMiniComponent color="orange">
            <template v-slot:title>
              $ {{pendingPayments}}
            </template>
            <template v-slot:subtitle>
              Pendientes de cobro
            </template>

          </GeneralCardMiniComponent>
        </v-col>

      </v-row>
    </v-card-text>
    <v-card-text>
      <generalGraphComponent type="axis-mixed" :labels="labels" :data="[
        {values: [0, 0, 0, 0, 0, outPayments],chartType: 'bar', name:'Gastos' },
        { values: [0, 0, 0, 0, 0, inPayments],chartType: 'bar', name:'Ingresos' },
        { values: [0, 0, 0, 0, 0, pendingPayments],chartType: 'bar', name:'Pendientes' }
    ]" :colors="['#333350','#ff6240','#ffc446']"></generalGraphComponent>

    </v-card-text>
  </generalCardComponent>
</template>

<script>
    import _ from 'lodash';
    import moment from 'moment'
  export default {
    data() {
      return {
        labels: []

      }
    },
    created() {
      this.$store.dispatch('accounting/findAll')
        this.setMonths()
    },
    methods: {
      setMonths() {
        for (let i = 0; i < 6; i++) {
          this.labels.push(moment().locale('es').subtract(6 - i, 'months').format('MMMM'));
        }
      }

    },
    computed:{
      payments() {
        return this.$store.getters['accounting/getList'] || {}
      },
      inPayments() {
        if(!this.payments.data) return 0
        let inPayments =this.payments.data.filter((p)=>{
          return p.type == 'expenses'  && p.status == 'payed'
        }).reduce((acc, curr)=>{
          return acc + curr.amount
        },0)
        console.log(inPayments)
        return inPayments
      },
      outPayments() {
        if(!this.payments.data) return 0
        let inPayments =this.payments.data.filter((p)=>{
          return p.type == 'suppliers'
        }).reduce((acc, curr)=>{
          return acc + curr.amount
        },0)
        console.log(inPayments)
        return inPayments
      },
      pendingPayments() {
        if(!this.payments.data) return 0
        let inPayments =this.payments.data.filter((p)=>{
          return p.type != 'suppliers' && p.status == 'pending'
        }).reduce((acc, curr)=>{
          return acc + curr.amount
        },0)
        console.log(inPayments)
        return inPayments
      },

    }
  }

</script>

<style>

</style>
