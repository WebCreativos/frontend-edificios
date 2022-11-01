<template>
  <div>
    <generalCardComponent v-bind="$attrs">
      <generalCardTitleComponent class="primary white--text" v-if="title">
        Visitas
        <v-spacer>
        </v-spacer>
      </generalCardTitleComponent>
      <v-card-subtitle class="primary">
        <v-btn color="secondary black--text rounded-lg font-weight-regular" large :disabled="modalVisits"
          @click="modalVisits = true">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR VISITA
        </v-btn>
      </v-card-subtitle>
      <v-expand-transition>
        <v-card-text v-show="modalVisits">
          <generalCardComponent>
            <generalCardTitleComponent>
              REGISTRO DE VISITANTES
            </generalCardTitleComponent>
            <v-divider></v-divider>
            <v-card-text class="py-6">
              <v-form ref="form">
                <v-row>
                  <v-col class="col-12" :class="{'col-sm-6':!apartment.id,'col-sm-12':apartment.id}">
                    <formsFieldsTextComponent v-model="visit.name" prepend-inner-icon="mdi-account" label="NOMBRE">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12" v-show="!apartment.id">
                    <formsFieldsSelectComponent v-model="visit.apartment" item-text="number" item-value="id"
                      :items="apartmentsList.data" type="number" label="APARTAMENTO"></formsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <v-row>
                      <v-col class="col-4">
                        <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']" v-model="visit.doc_type"
                          item-text="name" item-value="id" label=".">
                        </FormsFieldsSelectComponent>
                      </v-col>
                      <v-col class="col-8">
                        <formsFieldsTextComponent v-model="visit.doc" type="number"
                          prepend-inner-icon="mdi-file-document" label="DOCUMENTO (SIN PUNTOS NI GUIONES)"></formsFieldsTextComponent>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <formsFieldsTextComponent v-model="visit.phone" type="number" prepend-inner-icon="mdi-phone"
                      label="TELEFONO"></formsFieldsTextComponent>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col class="col-12 col-sm-6">
                  <v-btn color="red darken-1 white--text" @click="modalVisits = false" x-large block>
                    CANCELAR
                  </v-btn>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <v-btn color="secondary" class="white--text font-weight-regular" x-large block @click="addVisit()">
                    CHECK IN
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </generalCardComponent>
        </v-card-text>
      </v-expand-transition>
      <v-divider></v-divider>
      <v-card-text class="v-card-text-overflow">
        <v-list v-if="items.meta.pagination.total>0">
          <v-list-item class="elevation-2 rounded-lg my-3" v-for="item in items.data" :key="item.id">
            <v-list-item-avatar size="80" color="indigo darken-1" class="pa-2">
              <v-img src="/icons/person.png" contain></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h3>{{item.name}}</h3>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-note-text</v-icon>&nbsp;
                <b class="black--text">{{item.doc_type}}: {{item.doc}}</b>
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="item.phone">
                <v-icon>mdi-phone</v-icon>&nbsp;
                <b class="black--text">{{item.phone}}</b>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon>mdi-calendar</v-icon>&nbsp;
                {{ item.createdAt | formatDate }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon>mdi-clock</v-icon>&nbsp;
                Hora de salida: {{ item.out_hour | formatHour }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-actions>
              <v-btn v-show="!item.out_hour" :fab="isMobile" rounded color="yellow"
                class="font-weight-regular rounded-lg" @click="setCheckout(item.id)">
                <v-icon v-if="isMobile" size="30">ion-ios-exit</v-icon>
                <span v-else>CHECK OUT</span>
              </v-btn>
            </v-list-item-actions>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item class="elevation-2 rounded-lg my-3">
            <v-list-item-avatar>
              <v-icon size="60" color="primary">ion-ios-information-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Aun no tienes visitas registradas</h3>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions v-if="items.meta" class="d-flex justify-center">
        <v-pagination :length="items.meta.pagination.pageCount" v-model="page"></v-pagination>
      </v-card-actions>
    </generalCardComponent>
  </div>
</template>

<script>
  import dateFunctions from '~/plugins/mixins/dateFunctions.js';
  import textFunctions from '~/plugins/mixins/dateFunctions.js';
  import moment from 'moment'
  var qs = require('qs');
  export default {

    mixins: [dateFunctions, textFunctions],
    props: {
      title: {
        type: Boolean,
        default: false
      },
      apartment: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        page: 1,
        visit: {
          doc_type: 'CI',
        },
        modalVisits: false,
        hourMenu: false,
        headers: [{
          text: 'Fecha',
          value: 'createdAt'
        }, {
          text: 'Documento',
          value: 'doc'
        }, {
          text: 'Nombre',
          value: 'name'
        }],
        tab: 0,
        items: {
          data: [],
          meta: {
            pagination: {
              pageCount: 0,
            }
          }
        },
      }
    },
    mounted() {
      this.getVisits()
    },
    methods: {
      getVisits() {
        this.$axios.get('/visits', {
            params: {
              pagination: {
                page: this.page
              },
              filters: {
                apartment: this.apartment.id,
              }
            },
            paramsSerializer: params => {
              return qs.stringify(params, {
                arrayFormat: 'brackets'
              })
            }
          })
          .then((data) => {
            this.items = data.data
          })
      },
      setCheckout(id) {
        let currentHour = moment().format('HH:mm:00.000')
        this.$axios.put(`/visits/${id}`, {
            data: {
              out_hour: currentHour
            }
          })
          .then((data) => {
            this.getVisits()
          })
      },
      addVisit() {
        let data = {
          ...this.visit,
          apartment: this.apartment.id
        }

        this.$axios.post('/visits', {
          data: data
        }).then(response => {
          this.getVisits()
          //this.$emit('update')
          this.modalVisits = false
        })
      },
    },
    computed: {
      isMobile() {
        return this.$vuetify.breakpoint.xsOnly
      },
      apartmentsList() {
        return this.$store.getters['apartments/getList']
      },
    },
  }

</script>

<style>
  .v-card-text-overflow {
    max-height: 700px;
    overflow-x: auto;
  }

</style>
