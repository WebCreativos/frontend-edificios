<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Apartamentos
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent elevation="6">
          <v-card-title class="text-subtitle-1 font-weight-regular primary">
            <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" background-color="white" @click="search($event)" label="Buscar...">
              <template v-slot:icon>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </formsFieldsTextButtonComponent>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <propertiesListComponent outlined @changePage="search.pagination.page = $event" :data="data" expanded></propertiesListComponent>
          </v-card-text>
          <v-divider></v-divider>
        </generalCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        headers: [{
          text: 'Numero de apartamento',
          value: 'number',
          align: 'center'
        }, {
          text: 'En alquiler',
          value: 'in_rent',
          align: 'center'
        }, {
          text: 'Habitaciones',
          value: 'rooms',
          align: 'center'
        }, {
          text: 'Expensas',
          value: 'expenses_cost',
          align: 'center'
        }, {
          text: 'Metodo de pago (Expensas)',
          value: 'expenses_payment_method',
          align: 'center'
        },{
          text: 'Acciones',
          value: 'id',
          align: 'center'
        }],
        search: {
          populate:'*',
          pagination: {
            page: 1
          },
          /*
          filters: {
            number: null
          }
          */
        }
      }
    },
    mounted() {
      this.getProperties();
    },
    methods: {
      getProperties() {
        this.$store.dispatch('apartments/findAll', this.search)
      },
      deleteProperty(id) {
        this.$store.dispatch('apartments/delete', id)
      },
    },
    computed: {
      data() {
        return this.$store.getters['apartments/getList'];
      }
    },
    watch:{
        search: {
            handler() {
            this.getProperties();
            },
            deep: true
        }
    }
  }

</script>
