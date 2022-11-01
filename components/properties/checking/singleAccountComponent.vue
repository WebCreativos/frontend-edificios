<template>
  <v-card>
    <v-card-title v-if="!readOnly">
      <v-row>
        <v-col class="col-md-10 col-12">
          <v-input>
            <v-row>
              <v-col class="col-md-6 col-12">
                <FormsFieldsTextComponent :label="`Monto (${currency})`" v-model="amount" type="number"
                  prepend-inner-icon="mdi-currency-usd"></FormsFieldsTextComponent>

              </v-col>
              <v-col class="col-md-6 col-12">
                <FormsFieldsSelectComponent v-model="type" label="Tipo"
                  :items="[{value: 'deposit',text: 'Deposito' }, {value: 'withdrawal',text: 'Retiro'}]">
                </FormsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12">
                <FormsFieldsTextComponent v-model="concept" placeholder="Opcional..." label="Concepto">
                </FormsFieldsTextComponent>
              </v-col>
            </v-row>
          </v-input>
        </v-col>
        <v-col class="col-md-2 col-12">
          <v-btn block class="black--text rounded-lg font-weight-regular mt-md-7" color="success" height="55" x-large
            @click="addMoovment('USD')">
            <v-icon color="white">mdi-content-save</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card outlined>
        <v-card-title class="text-subtitle-2 pl-8">
          Movimientos
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-list dense class="py-0">
            <template v-for="(moovment,index) in moovments">
              <v-list-item :key="moovment.id">
                <v-list-item-avatar color="primary">
                  <v-icon color="green" v-if="moovment.type =='deposit'">mdi-arrow-right</v-icon>
                  <v-icon color="red" v-else>mdi-arrow-left</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-subtitle class="font-weight-light black--text">
                    <span v-if="moovment.concept">{{moovment.concept}}</span>
                    <span v-else>Sin concepto</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action-text class="font-weight-bold text-subtitle-2 black--text">
                  {{currency | currency}} {{moovment.amount}}
                </v-list-item-action-text>
              </v-list-item>
              <v-divider v-show="index!=moovments.length" :key="`d${moovment.id}`"></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-card-subtitle class="primary py-0">
          <v-list dense color="transparent">
            <v-list-item>
              <v-list-item-avatar color="primary">
                <v-icon color="white">mdi-bank</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle class="font-weight-bold white--text">Total</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action-text class="font-weight-bold text-subtitle-2 black--text white--text">
                {{currency | currency}} {{total}}
              </v-list-item-action-text>
            </v-list-item>
          </v-list>
        </v-card-subtitle>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    filters: {
      currency(value) {
        if (value == 'USD') {
          return 'US$'
        }
        return '$'
      }
    },
    props: {
      readOnly:{
        type: Boolean,
        default: false
      },
      apartment: {
        type: Object,
        required: true
      },
      currency: {
        type: String,
        default: 'USD'
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
      }
    },
    methods: {
      addMoovment() {
        this.$store.dispatch('checkingaccounts/add', {
          apartment: this.apartment.id,
          currency: this.currency,
        })
      },
    },
    computed: {

      ...mapFields('checkingaccounts', [
        'moovment.amount',
        'moovment.type',
        'moovment.concept',
      ]),

      moovments() {
        if(Array.isArray(this.value))
          return this.value.filter(account => account.currency === this.currency)
        return []
      },
      total() {
        return this.moovments.reduce((total, moovment) => {
          if (moovment.type === 'deposit') {
            return total + moovment.amount
          } else {
            return total - moovment.amount
          }
        }, 0)
      },
    }
  }

</script>
