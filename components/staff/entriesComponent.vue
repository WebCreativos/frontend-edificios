<template>
  <div>
    <generalCardComponent class="v-card-text-overflow">
      <generalCardTitleComponent v-if="title">
        Entradas/Salidas
        <v-spacer>
        </v-spacer>
      </generalCardTitleComponent>
      <v-divider></v-divider>
      <v-card-subtitle>
        <v-btn color="secondary" large :disabled="modalEntries"
          class="font-weight-regular rounded-lg black--text" @click="modalEntries = true">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR ENTRADA
        </v-btn>
      </v-card-subtitle>
      <v-expand-transition>
        <v-card-text v-show="modalEntries">
          <generalCardComponent>
            <v-card-title style="background:#333350" class="fill-width">
              <v-tabs v-model="entries.type" hide-slider slider-color="primary" active-class="active-tab" grow>
                <v-tab ripple value="IN">
                  <span class="font-weight-black white--text">ENTRADA</span>
                </v-tab>
                <v-tab ripple value="OUT">
                  <span class="font-weight-black white--text">SALIDA</span>
                </v-tab>
              </v-tabs>
            </v-card-title>
            <v-card-text class="py-6">
              <v-form ref="form">

                <v-row>
                  <v-col class="col-12">
                    <FormsFieldsSelectComponent v-model="entries" :items="staffList" return-object
                      prepend-inner-icon="mdi-account" label="NOMBRE">
                    </FormsFieldsSelectComponent>
                  </v-col>

                  <v-col class="col-12">
                    <formsFieldsTextComponent readonly v-model="entries.name" background-color="grey lighten-3"
                      prepend-inner-icon="mdi-account" label="NOMBRE">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <v-row>
                      <v-col class="col-4">
                        <FormsFieldsSelectComponent readonly :items="['CI', 'PASAPORTE']"
                          background-color="grey lighten-3" v-model="entries.doc_type" item-text="name" item-value="id"
                          label=".">
                        </FormsFieldsSelectComponent>
                      </v-col>
                      <v-col class="col-8">
                        <formsFieldsTextComponent readonly v-model="entries.doc" type="number"
                          background-color="grey lighten-3" prepend-inner-icon="mdi-file-document" label="DOCUMENTO">
                        </formsFieldsTextComponent>
                      </v-col>
                    </v-row>
                    <v-input>

                    </v-input>
                  </v-col>
                  <v-col class="col-12 col-sm-6">
                    <formsFieldsTextComponent readonly v-model="entries.phone" type="number"
                      background-color="grey lighten-3" prepend-inner-icon="mdi-phone" label="TELEFONO">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora</label>
                  <v-menu ref="entryMenu" v-model="hourMenu" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="entries.hour" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator =  "{on}">
                      <v-btn block class="black--text rounded-lg" color="white"  v-on="on" x-large @click="hourExitMenu = !hourExitMenu">
                        {{ entries.hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-time-picker v-if="hourExitMenu" v-model="entries.hour" full-width
                      @click:minute="$refs.entryMenu.save(entries.hour)"></v-time-picker>
                  </v-menu>
                  </v-col>

                </v-row>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col class="col-12 col-sm-6">
                  <v-btn color="red" class="darken-1 white--text rounded-lg font-weight-regular"
                    @click="modalEntries = false" x-large block>
                    CANCELAR
                  </v-btn>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <v-btn color="secondary" class="rounded-lg font-weight-regular white--text" x-large block
                    @click="addEntry()">
                    {{entries.type == 0 ? 'CHECK IN': 'CHECK OUT'}}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </generalCardComponent>
        </v-card-text>
      </v-expand-transition>
      <v-card-title>
        <FormsFieldsTextButtonComponent label="Buscar..." class="elevation-6 rounded-lg" @click="search($event)"
          v-model="search.name">
          <template v-slot:icon>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </FormsFieldsTextButtonComponent>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <v-list-item class="elevation-2 rounded-lg my-3" v-for="item in items.data" :key="item.id">
            <v-list-item-avatar size="80" color="indigo darken-1" class="pa-2">
              <v-img src="/icons/person.png" contain></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <h3>{{item.name | capitalize}}</h3>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-icon>mdi-note-text</v-icon>&nbsp;
                <b class="black--text">{{item.staff.doc_type}}: {{item.staff.doc | capitalize}}</b>
                <template v-if="item.phone">
                  &nbsp;-&nbsp;
                  <v-icon>mdi-phone</v-icon>&nbsp;
                  <b class="black--text">CI: {{item.staff.phone | capitalize}}</b>

                </template>
              </v-list-item-subtitle>

              <v-list-item-subtitle>
                <v-icon>mdi-clock</v-icon>&nbsp;
                {{ item | createdAt }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar size="80" color="green">
              <span class="white--text text-h6 font-weight-bold">
                {{ item.type | capitalize }}
              </span>
            </v-list-item-avatar>
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
  import moment from 'moment'
  var qs = require('qs');
  export default {

    props: {
      staffItems: [],
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
        hourMenu: false,
        page: 1,
        entries: {
          doc_type: 'CI',
        },
        search: {
          populate:'*',
          pagination: {
            page: 1
          },
          filter: {
            name: ''
          }
        },
        modalEntries: false,
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
    filters:{
      capitalize(value){
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      createdAt(item){
        return moment(item.createdAt).format('DD/MM/YYYY') +' a las '+ moment(item.hour,'HH:mm').format('HH:mm')
      }
    },
    mounted() {
      this.getEntries()
    },
    methods: {
      getEntries() {
        this.$axios.get('/staff-entries', {
            params: this.search,
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
      addEntry() {
        this.entries.type = this.entries.type == 0 ?'IN':'OUT'
        this.entries.hour = this.entries.hour +":00.000"
        this.$axios.post('/staff-entries', {
          data: this.entries
        }).then(response => {
          this.entries = {}
          this.modalEntries = false
          this.getEntries()
        })
      },
    },
    computed: {
      staffList() {
        return this.staffItems.map(item => {
          return {
            text: item.name,
            value: item.id,
            staff: item.id,
            ...item
          }
        })
      }
    }
  }

</script>

<style>
  .v-card-text-overflow {
    max-height: 700px;
    overflow-x: auto;
  }

</style>
