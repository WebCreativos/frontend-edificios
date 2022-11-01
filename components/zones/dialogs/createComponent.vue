<template>
  <v-dialog v-model="value" width="700">
    <GeneralCardComponent>
      <GeneralCardTitleComponent class="primary white--text">
        Agregar zona comun
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('input', false)">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-text class="pa-3">
        <v-form ref="formZones">
          <v-row>
            <v-col class="col-12">
              <FormsFieldsTextComponent label="Nombre" v-model="name"></FormsFieldsTextComponent>
            </v-col>
            <v-col class="col-12">
              <FormsFieldsTextComponent label="Aforo" v-model="capacity"></FormsFieldsTextComponent>
            </v-col>
            <v-col class="col-12">
              <v-card outlined class="rounded-lg">
                <v-card-title>Reglas de reserva</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pb-0">
                  <zonesReservationRulesFieldComponent @input="addRule($event)">
                  </zonesReservationRulesFieldComponent>
                </v-card-text>
                <v-card-text class="pb-0">
                  <v-row>
                    <v-col class="col-12" v-for="(rule,index) in rules" :key="'r'+index">
                      <zonesReservationRulesFieldComponent update :value="rule" :index="index" @input="rules[index]=$event">
                      </zonesReservationRulesFieldComponent>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondary black--text rounded-lg font-weight-regular" class="rounded-lg" @click="addZone()">
          AGREGAR ZONA&nbsp;&nbsp;<v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-card-actions>
    </GeneralCardComponent>
  </v-dialog>
</template>

<script>
  import {
    mapFields,
    mapMultiRowFields
  } from 'vuex-map-fields';
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      async addZone() {
        await this.$store.dispatch('zones/add')
        await this.$store.dispatch('zones/findAll')
        this.$store.dispatch('zones/clear')
        this.$emit('input', false)
      },
      addRule(rule) {
        this.$store.dispatch('zones/setRule',rule)
      },
      removeRule(index) {
        this.$store.dispatch('zones/removeRule',index)
      }
    },
    computed: {
      ...mapFields('zones', [
        'zone.name',
        'zone.capacity',
      ]),
      ...mapMultiRowFields('zones', [
        'zone.rules'
      ]),
    }
  }

</script>

<style>

</style>
