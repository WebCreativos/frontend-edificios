<template>
  <GeneralCardComponent>
    <v-card-title class="text-subtitle-1 font-weight-regular">
      DATOS DEL APARTAMENTO
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-md-6">
      <v-row>
        <v-col class="col-12">
          <formsFieldsTextComponent prepend-inner-icon="mdi-numeric" :readonly="readonly" :error-messages="errorApartmentExists"
            @input="checkIfApartmentExists($event)" :rules="rules.required" type="number" v-model="number"
            label="Numero de apartamento">
          </formsFieldsTextComponent>
          <!-- span error -->
          <span v-if="errorApartmentExists.length>0" class="error--text">{{errorApartmentExists[0]}}</span>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="ion-ios-bed" :rules="rules.required" v-model="rooms"
            type="number" label="Habitaciones">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="mdi-toilet" :rules="rules.required" type="number"
            v-model="bathrooms" label="Banos">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-4">
          <formsFieldsTextComponent prepend-inner-icon="ion-md-expand"  :rules="rules.required" type="number"
            v-model="square_meters" label="M²">
          </formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              EXPENSAS
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col class="col-md-3">
                  <formsFieldsSelectComponent :items="['USD','UYU']" :readonly="readonly" :rules="rules.required" value="USD"
                    v-model="expenses_currency" label="Moneda">
                  </formsFieldsSelectComponent>
                </v-col>
                <v-col class="col-md-9">
                  <formsFieldsTextComponent prepend-inner-icon="mdi-currency-usd" :readonly="readonly" :rules="rules.required" type="number"
                    v-model="expenses_cost" label="Costo">
                  </formsFieldsTextComponent>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-text>
              <v-radio-group hide-details v-model="expenses_payment_method">
                <v-row>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent value="Card" :readonly="readonly" label="Tarjeta">
                    </formsFieldsRadioComponent>
                  </v-col>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent value="Cash" :readonly="readonly" label="Efectivo">
                    </formsFieldsRadioComponent>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col class="col-12">
          <v-card outlined class="rounded-lg">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              AMENITIES
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-chip-group multiple v-model="amenities">
                <v-chip filter active-class="primary" class="font-weight-bold text-uppercase" label
                  close-icon="cursor-pointer" :value="amenity.id" v-for="amenity in amenitiesList.data"
                  :key="'a'+amenity.id">
                  {{amenity.name}}&nbsp;
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-12">
          <v-card outlined class="rounded-lg" v-if="readonly == false">
            <v-card-title class="text-subtitle-2 font-weight-regular">
              PROPIEDAD ALQUILADA
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-radio-group hide-details v-model="in_rent">
                <v-row>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="true" label="SI">
                    </formsFieldsRadioComponent>
                  </v-col>
                  <v-col class="col-md-6">
                    <formsFieldsRadioComponent :value="false" label="NO">
                    </formsFieldsRadioComponent>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-card-text>
          </v-card>

        </v-col>

      </v-row>
    </v-card-text>
  </GeneralCardComponent>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  export default {
    props: {
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        rules: {
          required: [value => !!value || 'Campo requerido'],
        },
        errorApartmentExists: [],
        selected: false,
      }
    },
    created() {
      this.getPropertyData()
      this.$store.dispatch('amenities/find')
    },
    methods: {
      async getPropertyData() {},
      amenitySelected(value) {
        return this.amenitiesList.includes(value);
      },
      selectAmenity(value) {
        console.log("aca")
        if (this.amenitySelected(value)) {
          this.amenities = this.amenities.filter(amenity => amenity !== value);
        } else {
          this.amenities.push(value);
        }
      },
      async checkIfApartmentExists(number) {
        const exists = await this.$store.dispatch('apartments/checkIfExists', number)
        this.errorApartmentExists = exists && !this.id ? ['Ya existe un apartamento con ese numero'] : []
      }
    },
    computed: {
      amenitiesList() {
        return this.$store.getters['amenities/getList']
      },
      ...mapFields('apartments', [
        'apartment.number',
        'apartment.id',
        'apartment.rooms',
        'apartment.bathrooms',
        'apartment.square_meters',
        'apartment.payment_method',
        'apartment.amenities',
        'apartment.expenses_payment_method',
        'apartment.expenses_currency',
        'apartment.expenses_cost',
        'apartment.in_rent',
        'apartment.test',
      ]),

    },
  }

</script>

<style>

</style>
