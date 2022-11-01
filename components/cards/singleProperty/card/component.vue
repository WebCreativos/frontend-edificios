<template>
  <GeneralCardComponent>
    <slot></slot>
    <v-card-title class="primary">
      <v-tabs :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
        background-color="primary" active-class="active-tab" grow>
        <v-tab ripple :value="1">
          <span class="font-weight-black white--text">FICHA</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">VISITAS</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">RESERVAS</span>
        </v-tab>
        <v-tab ripple :value="3" v-if="data.invoices && data.invoices.length>0">
          <span class="font-weight-black white--text">FACTURAS</span>
        </v-tab>
        <v-tab ripple :value="4">
          <span class="font-weight-black white--text">CUENTA CORRIENTE</span>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <cardsSinglePropertyCardSheetComponent :readOnly="readOnly" :data="data"></cardsSinglePropertyCardSheetComponent>
        </v-tab-item>
        <v-tab-item>
          <propertiesVisitsComponent :apartment="data" outlined class="mt-3"></propertiesVisitsComponent>
        </v-tab-item>
        <v-tab-item class="pa-4">
          <zonesReservationComponent></zonesReservationComponent>
        </v-tab-item>
        <v-tab-item v-if="data.invoices && data.invoices.length>0">
          <AccountingPaymentsComponent v-if="data.invoices" outlined class="mt-3"
            :data="data.invoices">
          </AccountingPaymentsComponent>
        </v-tab-item>
        <v-tab-item class="py-4">
          <propertiesCheckingAccountsComponent :readOnly="readOnly" :apartment="data"></propertiesCheckingAccountsComponent>
        </v-tab-item>

      </v-tabs-items>
    </v-card-text>
    <v-divider></v-divider>
  </GeneralCardComponent>

</template>

<script>
    import _ from 'lodash'
    import moment from 'moment'
    export default {
      props: {
        readOnly:{
          type:Boolean,
          default:false
        },
        data: {
          type: Object,
          required: true,
          default: {
            attributes: {
              amenities: {
                data: []
              }
            }
          }
        },
        getData: {
          type: Boolean,
          default: false
        },
      },
      data() {
        return {
          headersRentals: [{
              text: 'Inquilino',
              value: 'name',
            },
            {
              text: 'Documento',
              value: 'doc',
            },
            {
              text: 'Desde',
              value: 'start_date',
            },
            {
              text: 'Hasta',
              value: 'end_date',
            },
          ],
          tab: 0,
          openRentalForm: false,
        }
      },
      mounted() {
      },
      methods: {
        getOwner() {
          this.$store.dispatch('owners/find', {
            apartment: this.data.id
          })
        },
        getRentals() {
          this.$store.dispatch('rentals/findAll', {
            filters: {
              apartment: this.data.id,
            },
            populate: '*'
          })
        }
      },
      watch: {
        getData: {
          handler: function (val) {
            if (val) {
              this.getOwner()
              this.getRentals()
            }
          },
          immediate: true
        }
      }
    }
  
  </script>
  
<style>

</style>
