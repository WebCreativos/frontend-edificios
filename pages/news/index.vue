<template>
  <v-container>
    <HeadersGeneralComponent>
      <template v-slot:title>
        Novedades
      </template>
      <template v-slot:subtitle>

      </template>
    </HeadersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent>
          <v-toolbar color="primary" elevation="0">
            <v-toolbar-title class="font-weight-regular white--text">
              Información de interés para el edificio
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="openNewsForm = true">Agregar&nbsp;<v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
          <v-slide-y-transition>
            <v-card-text v-if="openNewsForm">
              <v-card outlined class="rounded-lg">
                <v-card-text>
                  <v-row>
                    <v-col class="col-12">
                      <FormsFieldsTextComponent v-model="nw.title" label="Titulo"></FormsFieldsTextComponent>
                    </v-col>
                    <v-col class="col-12">
                      <FormsFieldsTextareaComponent v-model="nw.content" label="Contenido">
                      </FormsFieldsTextareaComponent>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="yellow" class="font-weight-regular white--text" @click="openNewsForm = false">
                        Cerrar
                    </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="secondary" class="rounded-lg" @click="addNews()">
                    Guardar&nbsp;<v-icon>ion-ios-save</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>
          </v-slide-y-transition>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <v-data-table :headers="headers" hide-default-footer :items="news.data">
                  <template v-slot:item.createdAt="{ item }">
                    <b>{{ item.createdAt | date }}</b>
                  </template>
                  <template v-slot:item.id="{ item }">
                    <v-btn color="red" fab block x-small class="rounded-lg white--text" elevation="1" @click="deleteNews(item.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </generalCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
 import moment from 'moment'
  export default {
    filters: {
      date(value) {
        return moment(value).format('DD/MM/YYYY')
      },
    },
    data() {
      return {
        nw: {},
        openNewsForm: false,
        headers: [{
            text: 'Título',
            value: 'title'
          },
          {
            text: 'Contenido',
            value: 'content'
          },
          {
            text: 'Fecha',
            value: 'createdAt'
          },
          {
            text: 'Acciones',
            value: 'id',
            sortable: false,
            align:'center'
          }
        ],
      }
    },
    created() {
      this.$store.dispatch('news/findAll')
    },
    methods:{
        addNews() {
            this.$store.dispatch('news/add',this.nw)
            this.$store.dispatch('news/findAll')
            this.openNewsForm = false
            this.nw = {}
        },
        deleteNews(id) {
            this.$store.dispatch('news/delete',id)
            this.$store.dispatch('news/findAll')
        }
    },
    computed: {
      news() {
        return  this.$store.getters['news/getList']
      }
    }
  }

</script>

<style>

</style>
