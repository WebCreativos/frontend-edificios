<template>
  <GeneralCardComponent>
    <slot name="header">
      <v-card-title class="text-subtitle-1 font-weight-regular">
        DATOS DEL INQUILINO
      </v-card-title>
    </slot>
    <v-card-text class="pa-md-6">
      <v-row>
        <v-col class="col-md-8">
          <v-row>
            <v-col class="col-12 col-sm-6">
              <formsFieldsTextComponent prepend-inner-icon="mdi-account" :readonly="readOnly" :rules="rules.required"
                v-model="name" label="Nombre del inquilino">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-12 col-sm-6">
              <formsFieldsTextComponent prepend-inner-icon="mdi-file" :readonly="readOnly"
                :error-messages="errorUserExists" :rules="rules.required" v-model="username" type="number"
                @input="checkIfUserExists($event)" label="Documento de identidad">
              </formsFieldsTextComponent>
              <span v-if="errorUserExists.length>0" class="error--text">{{errorUserExists[0]}}</span>
            </v-col>
            <v-col class="col-6">
              <formsFieldsTextComponent prepend-inner-icon="mdi-file" :readonly="readOnly" v-model="phone" type="number"
                label="Celular/Telefono">
              </formsFieldsTextComponent>
            </v-col>
            <v-col class="col-6">
              <formsFieldsSelectComponent prepend-inner-icon="mdi-file" v-model="warranty_type"
                :items="['Aseguradora','Deposito','Inmueble']" type="number" :readonly="readOnly"
                label="Tipo de garantia">
              </formsFieldsSelectComponent>
            </v-col>
            <v-col class="col-12">
              <v-card outlined class="rounded-lg">
                <v-card-title class="text-subtitle-2 font-weight-regular">
                  PERIODO DE ALQUILER
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col class="col-md-6">
                      <formsFieldsTextComponent prepend-inner-icon="mdi-calendar" :readonly="readOnly"
                        :rules="rules.required" type="date" v-model="start_date" label="Desde">
                      </formsFieldsTextComponent>
                    </v-col>
                    <v-col class="col-md-6">
                      <formsFieldsTextComponent prepend-inner-icon="mdi-calendar" :readonly="readOnly"
                        :rules="rules.required" type="date" v-model="end_date" label="Hasta">
                      </formsFieldsTextComponent>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

            </v-col>
          </v-row>

        </v-col>
        <v-col class="col-md-4">
          <v-row>
            <v-col class="col-12">
              <generalUploadSingleFileComponent v-if="!doc_front" :readonly="readOnly" v-model="front">
                Documento - Frente
              </generalUploadSingleFileComponent>
              <v-card outlined v-else>
                <v-card-subtitle class="font-weight-bold black--text">
                  Documento - Dorso
                </v-card-subtitle>
                <v-card-text >
                  <v-img :src="doc_front.url" width="100%" contain></v-img>
                </v-card-text>
              </v-card>

            </v-col>
            <v-col class="col-12">
              <generalUploadSingleFileComponent v-if="!doc_back" :readonly="readOnly" v-model="back">
                Documento - Dorso
              </generalUploadSingleFileComponent>
              <v-card outlined v-else>
                <v-card-subtitle class="font-weight-bold black--text">
                  Documento - Dorso
                </v-card-subtitle>
                <v-card-text >
                  <v-img :src="doc_front.url" width="100%" contain></v-img>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-show="!readOnly">
      <v-spacer></v-spacer>
      <slot name="actions"></slot>
    </v-card-actions>
  </GeneralCardComponent>
</template>

<script>
  import {
    mapFields
  } from 'vuex-map-fields';
  import moment from 'moment';
  import usersMixins from '~/plugins/mixins/forms/users.js'
  export default {
    mixins: [usersMixins],
    props: {
      readOnly: {
        type: Boolean,
        default: false
      },
    },
    created() {
      this.start_date = moment().format('YYYY-MM-DD');
      this.end_date = moment().add(1, 'year').format('YYYY-MM-DD');
    },
    data() {
      return {
        rules: {
          required: [value => !!value || 'Campo requerido'],
        },
      }
    },
    computed: {
      ...mapFields('rentals', [
        'rental.warranty_type',
        'rental.start_date',
        'rental.end_date',
        'rental.front',
        'rental.back',
        'rental.doc_front',
        'rental.doc_back',
        'user.name',
        'user.phone',
        'user.id',
        'user.username',
      ]),

    },
    watch: {
      owner: {
        handler(val) {
          this.$emit('input', {
            ...val,
            type: 'tenant'
          })
        },
        deep: true
      }
    }
  }

</script>

<style>

</style>
