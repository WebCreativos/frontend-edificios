<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Ticket de soporte
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent>
          <generalCardTitleComponent>
            Mi ticket
          </generalCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col class="col-12">
                <formsFieldsTextareaComponent label="Descripcion del problema" v-model="ticket.description">
                </formsFieldsTextareaComponent>
              </v-col>
              <v-col class="col-12">
                <FormsFieldsSelectComponent label="Area" item-text="name" value="name"
                  :items="areas.data" v-model="ticket.area"></FormsFieldsSelectComponent>
              </v-col>
              <v-col class="col-12">
                <formsFieldsSelectComponent :items="prioritys" v-model="ticket.priority" label="Prioridad">
                </formsFieldsSelectComponent>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="addTicket()" class="rounded-lg">
              Enviar ticket
            </v-btn>
          </v-card-actions>
        </generalCardComponent>
      </v-col>
      <v-col class="col-12">
        <ticketsListComponent></ticketsListComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        ticket: {
          description: '',
          area: 'Seleccione una opcion',
          priority: 'High'
        },
        prioritys: [{
          text: 'Baja',
          value: 'Low'
        }, {
          text: 'Media',
          value: 'Medium'
        }, {
          text: 'Alta',
          value: 'High'
        }],
        areas: {},
        tickets: {
          data: []
        },
      }
    },
    created() {
      this.getAreas()
    },
    methods: {
      getAreas() {
        this.$axios.get('/areas')
          .then(response => {
            this.areas = response.data
            this.areas.data.unshift({
              attributes: {
                name: 'Seleccione una opcion'
              }
            })
          })
      },
    addTicket() {
      this.ticket.apartment=this.$auth.user.data.apartment.id
      this.$axios.post('/tickets', {data:this.ticket})
        .then(response => {
          this.$root.$emit('tickets')
        })
    },
    },
  }

</script>

<style>

</style>
