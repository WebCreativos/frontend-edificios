<template>
  <v-dialog persistent :value="value" width="700">
    <GeneralCardComponent width="100%">
      <GeneralCardTitleComponent class="primary white--text">
        Nueva factura
        <v-spacer></v-spacer>
        <generalCloseButtonComponent @input="$emit('input',$event)"></generalCloseButtonComponent>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col class="col-12">
              <FormsFieldsSelectComponent v-model="type" label="Tipo" :rules="rules.required" :items="[
                        {text:'Cobro de expensas',value:'expenses',},
                        {text:'Cobro de renta',value:'rental'},
                        {text:'Pago a proveedores',value:'suppliers'}
                        ]">
              </FormsFieldsSelectComponent>

            </v-col>
            <v-col class="col-12">
              <formsFieldsSelectComponent v-model="apartment" v-if="type != 'suppliers'" item-text="number"
                item-value="id" :items="apartmentsList.data" type="number" label="APARTAMENTO">
              </formsFieldsSelectComponent>

            </v-col>
            <v-col class="col-12">
              <FormsFieldsSelectComponent v-model="status" label="Estado" :items="[
                {text:'Pagado',value:'payed',},
                {text:'Pendiente',value:'pending'}
            ]">
              </FormsFieldsSelectComponent>
            </v-col>
            <v-col class="col-md-3 col-4">
              <formsFieldsSelectComponent :items="['USD','UYU']" value="USD" :rules="rules.required" v-model="currency" label="Moneda">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-md-9 col-8">
              <formsFieldsTextComponent prepend-inner-icon="mdi-currency-usd" type="number" v-model="amount"
                label="Costo">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-6 col-12">
              <formsFieldsTextComponent prepend-inner-icon="mdi-account" :rules="rules.required" type="text" v-model="name"
                label="Nombre/Razon social">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-6 col-12">
              <formsFieldsTextComponent prepend-inner-icon="mdi-number" :rules="rules.required" type="number" v-model="doc" label="CI/RUT">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-12 col-12">
              <formsFieldsTextComponent prepend-inner-icon="mdi-map" :rules="rules.required" v-model="address" label="Direccion">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-md-12">
              <formsFieldsTextComponent v-model="comments" label="Comentarios">
              </formsFieldsTextComponent>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-regular" class="rounded-lg"
          @click="addPayment()">
          Agregar factura&nbsp;&nbsp;<v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
    <v-snackbar color="warning" v-model="snackErrorForm">
      Hay campos requeridos incompletos
    </v-snackbar>
  </v-dialog>

</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        snackErrorForm: false,
        rules:{
          required: [(value) => !!value || 'Este campo es requerido'],
          number: (value) => value.match(/^[0-9]*$/) || 'Este campo solo acepta numeros'
        },
        apartment: null
      }
    },
    created() {
      this.$store.dispatch('apartments/findAll')
    },
    methods: {
      async addPayment() {
        if(!this.$refs.form.validate()) {
          this.snackErrorForm = true
          setTimeout(() => {
            this.snackErrorForm = false
          }, 3000)
          return
        }
        let invoice = await this.$store.dispatch('accounting/add')
        this.$store.dispatch('accounting/findAll')
        console.log(invoice)
        if(this. apartment) {
          this.$store.dispatch('apartments/addInvoices',{
            id:this.apartment,
            invoice:invoice
          })
        }
        this.$emit('input', false)
      }
    },
    computed: {
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
      ...mapFields('accounting', [
        'payment.name',
        'payment.type',
        'payment.amount',
        'payment.address',
        'payment.comments',
        'payment.status',
        'payment.doc',
        'payment.currency',
      ]),
    }
  }

</script>

<style>

</style>
