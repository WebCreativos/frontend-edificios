<template>
  <div>

    <generalCardComponent fillHeight elevation="6">
      <GeneralCardTitleComponent class="primary white--text">
        Expensas
      </GeneralCardTitleComponent>
      <v-card-text>
        <v-row>
          <v-col class="col-12">
            <h3 class="black--text font-weight-regular">Monto total</h3>
            <h3 class="black--text font-weight-black">$ {{totalAmount}}</h3>
          </v-col>
          <v-col class="col-12">
            <v-progress-linear  color="secondary" :value="Math.ceil((totalAmount-pendingAmount)*100/totalAmount)" rounded
              class="rounded-xl elevation-2" height="30">
              <template v-slot:default="{ value }">
                <strong>{{ Math.ceil(value) }}%</strong>
              </template>
            </v-progress-linear>
          </v-col>
          <v-col class="col-12">
            <v-card class="rounded-xl" color="primary">
              <v-card-text>
                <v-row>
                  <v-col class="col-12">
                    <h4 class="font-weight-light white--text">Apartamentos con deudas pendientes</h4>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <v-row no-gutters>
                      <v-avatar size="60" tile color="secondary" class="rounded-lg">
                        <v-icon color="white">
                          ion-ios-home
                        </v-icon>
                      </v-avatar>
                      <v-avatar size="60" tile color="secondary" class="rounded-lg ml-n3">
                        <v-icon color="white">
                          ion-ios-home
                        </v-icon>
                      </v-avatar>
                      <v-avatar size="60" tile class="rounded-lg ml-n3">
                        <v-img width="60" height="60" contain src="https://cdn.vuetifyjs.com/images/lists/1.jpg">
                          <div class="d-flex fill-width fill-height justify-center align-center"
                            style="background:#f44336b0">
                            <h2 class="white--text">+{{countApartmentsWithPendingPayments}}</h2>
                          </div>
                        </v-img>
                      </v-avatar>
                    </v-row>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <v-btn height="60" color="secondary" large block class="font-weight-regular rounded-lg"
                      @click="modalPendingPayments = !modalPendingPayments">VER</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </generalCardComponent>
    <v-dialog v-model="modalPendingPayments" persistent>
      <propertiesListComponent title @changePage="search.pagination.page = $event" hiddenheader
        :data="apartmentsWithPendingPayments">
        <template v-slot:actions>
          <v-btn icon color="white" @click="modalPendingPayments = !modalPendingPayments">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </propertiesListComponent>
    </v-dialog>

  </div>

</template>

<script>
  var qs = require('qs');
  export default {
    data() {
      return {
        modalPendingPayments: false,
        apartmentsWithPendingPayments: {
          data: [],
          meta: {
            pagination:{
              total:0
            }
          }
        },
        search: {
          pagination: {
            page: 1,
          }
        }
      }
    },
    created() {
      this.getPendingPayments()
    },
    methods: {
      getPendingPayments() {
        this.$axios.get('apartaments/', {
          params: {
            populate: '*',
            filters:{
              building: this.$auth.user.building.id,
            }
          },
          paramsSerializer: params => {
            return qs.stringify(params, {
              arrayFormat: 'brackets'
            })
          }
        }).then((data) => {
          this.apartmentsWithPendingPayments = data.data
        })
      }
    },
    computed: {
      pendingAmount() {
        return this.apartmentsWithPendingPayments.data.reduce((total, apartment) => {
          return total + apartment.invoices.filter((invoice) => invoice.status ==
            'pending').reduce((total, invoice) => {
            return total + invoice.amount
          }, 0)
        }, 0)

      },
      totalAmount() {
        return this.apartmentsWithPendingPayments.data.reduce((total, apartment) => {
          return total + apartment.invoices.reduce((total, invoice) => {
            return total + invoice.amount
          }, 0)
        }, 0)

      },
      countApartmentsWithPendingPayments() {
        return this.apartmentsWithPendingPayments.data.filter((apartment) => {
          return apartment.invoices.find((invoice) => invoice.status == 'pending') != undefined
        }).length
      }

    }
  }

</script>

<style>

</style>
