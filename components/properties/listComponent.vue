<template>
  <generalCardComponent fillHeight class="d-flex justify-space-between flex-column" v-bind="$attrs">
    <generalCardTitleComponent class="white--text primary" v-show="title">
      Propiedades
      <v-spacer></v-spacer>
      <slot name="actions"></slot>
    </generalCardTitleComponent>
    <v-card-text class="py-6">
      <v-row no-gutters class="justify-left align-center" v-show="!hiddenheader">
        <v-col class="col-xl-3 col-lg-4 col-md-5 mb-3 mb-sm-0 d-flex justify-center d-sm-inline">
          <v-progress-circular size="200" width="17" color="primary" :value="60" rotate="270">
            <v-progress-circular size="160" width="17" color="red" :value="35" rotate="135"
              class="progress-circular text-h5 font-weight-black">
              <span class="black--text" v-if="data.meta.pagination && rentals.meta.pagination">{{data.meta.pagination.total + rentals.meta.pagination.total}}</span>
            </v-progress-circular>
          </v-progress-circular>
        </v-col>
        <v-col class="col-xl-9 col-lg-8 col-md-7 d-flex justify-center flex-column">
          <v-row>
            <v-col class="col-md-6">
              <generalCardMiniComponent>
                <template v-slot:title v-if="data.meta.pagination">
                  {{data.meta.pagination.total}}
                </template>
                <template v-slot:subtitle>
                  Total
                </template>

              </generalCardMiniComponent>
            </v-col>
            <v-col class="col-md-6">
              <generalCardMiniComponent color="red">
                <template v-slot:title  v-if="rentals.meta.pagination">
                  {{rentals.meta.pagination.total}}
                </template>
                <template v-slot:subtitle>
                  Inquilinos
                </template>
              </generalCardMiniComponent>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text>

      <!-- generate a lit of properties using vuetify v-data-table -->

      <v-data-table hide-default-footer disable-sort calculate-widths :headers="finalHeaders"  :items-per-page="-1" :items="data.data"
        class="font-weight-bold text-h5">
        <template v-slot:item.image="{ item }">
          <div class="d-flex justify-center pa-2">
            <v-icon size="80">mdi-home</v-icon>
          </div>
        </template>
        <template v-slot:item.number="{ item }">
          Apto {{ item.number }}
        </template>
        <template v-slot:item.expenses_cost="{ item }">
          {{ item.expenses_currency | currency }} {{ item.expenses_cost }}
        </template>
        <template v-slot:item.expenses_payment_method="{ item }">
          {{ item.expenses_payment_method | paymentMethod }}
        </template>

        <template v-slot:item.in_rent="{ item }">
          <span class="text-subtitle-1 font-weight-regular">{{item.in_rent}}</span>
          <v-icon size="24" class="mb-1" :color="setColorStatus(item.in_rent)">mdi-circle</v-icon>
        </template>
        <template v-slot:item.actions="{item}">
          <cardsSinglePropertyComponent :data="item"></cardsSinglePropertyComponent>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions class="d-flex justify-center" v-if="data.meta.pagination.pageCount>1">
      <v-pagination circle @input="$emit('changePage',$event)" v-model="page" :length="data.meta.pagination.pageCount"></v-pagination>
    </v-card-actions>
  </generalCardComponent>

</template>

<script>

  export default 
  {
    filters:{
      currency(value){
        return value == 'USD' ? 'US$' : '$'
      },
      paymentMethod(value){
        if(value=='Card') {
          return 'Tarjeta'
        } else {
          return 'Efectivo'
        }
      }
    },
    props: {
      expanded: {
        type: Boolean,
        default: false
      },
      hiddenheader:{
        type: Boolean,
        default: false
      },
      title: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        page:1,
        headers: [{
          text: '',
          value: 'id',
          align: 'center'
        },{
          text: '',
          value: 'image',
          align: 'center'
        }, {
          text: 'Numero',
          value: 'number',
          align: 'center'
        }, {
          text: 'Habitaciones',
          value: 'rooms',
          align: 'center'
        },{
            text: 'Baños',
            value: 'bathrooms',
            align: 'center'
          }, {
          text: 'En alquiler',
          value: 'in_rent',
          align: 'center'
        }, {
          text: 'Acciones',
          value: 'actions',
          align: 'center'
        }]
      }
    },
    created() {
        this.getRentals()

    },
    methods: {
      setColorStatus(status) {
        if (status == true) return 'green'
        return 'red'
      },
      getRentals() {
        this.$store.dispatch('rentals/findAll')
      }
    },
    computed: {
      rentals() {
        return this.$store.getters['rentals/getAll']
      },  
      finalHeaders() {
        var headers = this.headers
        if (this.expanded) {
          var expandedHeaders = [{
            text: 'Baños',
            value: 'bathrooms',
            align: 'center'
          }, {
            text: 'Expensas',
            value: 'expenses_cost',
            align: 'center'
          }, {
            text: 'Metodo de pago (Expensas)',
            value: 'expenses_payment_method',
            align: 'center'
          }]
          headers.splice(headers.length - 1, 0, ...expandedHeaders)
        }
        return headers
      }
    }

  }

</script>
<style></style>
