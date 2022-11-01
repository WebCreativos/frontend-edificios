<template>
  <generalCardComponent>
    <generalCardTitleComponent>
    Tickets
    </generalCardTitleComponent>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table :headers="headers" hide-default-footer :items="tickets.data">
        <template v-slot:item.priority="{ item }">
          <v-chip :color="getColor(item.priority)" text-color="white">
            <b>{{ item.priority | priority }}</b>
          </v-chip>
        </template>
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" text-color="white">
            <b>{{ item.status | status }}</b>
          </v-chip>
        </template>
        <template v-slot:item.createdAt="{ item }">
          <b>{{ item.createdAt | date }}</b>
        </template>
        <template v-slot:item.id="{ item }">
          <v-btn small rounded color="yellow" v-if="item.status!='Closed'" @click="updateStatus(item)">
            Cerrar ticket
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </generalCardComponent>

</template>

<script>
  import moment from 'moment'

  var qs = require('qs');

  export default {
    data() {
      return {
        tickets: {
          data: []
        },
        headers: [{
            text: 'Descripcion',
            value: 'description'
          },
          {
            text: 'Area',
            value: 'area'
          },
          {
            text: 'Prioridad',
            value: 'priority'
          },
          {
            text: 'Estado',
            value: 'status'
          },
          {
            text: 'Fecha de creacion',
            value: 'createdAt'
          },
          {
            text: 'Cambiar estado',
            value: 'id'
          }
        ],
      }
    },
    filters: {
      date(value) {
        return moment(value).format('DD/MM/YYYY') + ' a las ' + moment(value).format('HH:mm')
      },
      priority(value) {
        switch (value) {
          case 'Low':
            return 'Baja'
          case 'Medium':
            return 'Media'
          case 'High':
            return 'Alta'
        }
      },
      status(value) {
        switch (value) {
          case 'Open':
            return 'Abierto'
          case 'Closed':
            return 'Cerrado'
        }
      }
    },
    created() {
      this.getTickets()
      this.$root.$on('tickets', () => {
        this.getTickets()
      })
    },
    methods: {
      updateStatus(ticket) {
        this.$axios.put('tickets/' + ticket.id, {
          data: {
            status: 'Closed'
          }
        }).then(response => {
          this.$root.$emit('tickets')
        })
      },
      getColor(color) {
        switch (color) {
          case 'Low':
          case 'Open':
            return 'green'
          case 'Medium':
            return 'yellow'
          case 'High':
          case 'Closed':
            return 'red'
        }
      },
      getTickets() {
        var params = {
          filters: {}
        }
        if (this.$auth.user.type != 'admin') {
          params.filters.apartment = this.$auth.user.data.apartment.id
        }
        this.$axios.get('/tickets', {
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params, {
                arrayFormat: 'brackets'
              })
            }
          })
          .then(response => {
            this.tickets = response.data
          })
      },

    }
  }

</script>

<style>

</style>
