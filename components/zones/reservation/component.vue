<template>
  <div>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent>
          <GeneralCardTitleComponent class="primary white--text">
            <slot name="calendarTitle">
              Mis reservas
            </slot>
          </GeneralCardTitleComponent>
          <v-card-text>
            <zonesCalendarComponent :apartment="apartment" :zone="search.zone">
            </zonesCalendarComponent>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
      <v-col class="col-12">
        <GeneralCardComponent>
          <GeneralCardTitleComponent class="primary white--text">
            <slot name="listTitle">
              Listado de zonas
            </slot>
          </GeneralCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <template v-for="(zone, index) in zoneList.data">
                <v-list-item :key="`v${index}`">
                  <v-list-item-avatar color="grey">
                    <v-img sizes="80,80"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <h3>{{zone.name}}</h3>
                    </v-list-item-title>
                    <v-list-item-title>
                      Capacidad: {{zone.capacity}}
                    </v-list-item-title>

                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn depressed color="secondary font-weight-regular" @click="openReservationZone(zone)">AGENDARSE</v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="`d${index}`"></v-divider>
              </template>
              <v-list-item>
                <v-list-item-avatar color="grey">
                  <v-img sizes="80,80"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    <h3>Lavanderia</h3>
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn depressed color="secondary font-weight-regular" @click="openReservationLaundry()">AGENDARSE</v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <zonesReservationDialogsComponent v-if="zone" :apartment="apartment" v-model="zoneReservationModal" :zone="zone">
    </zonesReservationDialogsComponent>
    <zonesReservationDialogsLaundryComponent v-if="zone" :apartment="apartment" v-model="zoneReservationLaundryModal" :zone="zone">
    </zonesReservationDialogsLaundryComponent>

  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    props: {
      flat: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        zonesModal: false,
        zoneReservationModal: false,
        zoneReservationLaundryModal: false,
        zone: {},
        colorsCalendar: {
          'consulta': '#ffc107',
          'evento': '#4caf50'
        },
        search: {
          consulta: {},
          type: null
        },
        apartment: {},
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
          min: value => value.length >= 3 || 'Este campo debe tener al menos 3 caracteres.',
          max: value => value.length <= 250 || 'Este campo debe tener como maximo 250 caracteres.'
        }
      }
    },
    created() {
      if (this.$auth.loggedIn) {
        if (this.$auth.user.data) {
          this.apartment = this.$auth.user.data.apartment
        }
      }
      this.$store.dispatch('zones/findAll')
    },
    methods: {

      formatDate(date) {
        let newdate = date.split('-')
        return newdate[2] + '/' + newdate[1] + '/' + newdate[0]
      },
      openReservationZone(zone) {
        this.zone = zone
        this.zoneReservationModal = true
      },
      openReservationLaundry() {
        this.zoneReservationLaundryModal = true
      }
    },
    computed: {
      zoneList() {

        var zones = _.cloneDeep(this.$store.getters['zones/getList'])
        zones.data= zones.data.filter((z)=>{
          var onlyOwners = z.rules.find((r)=>{
            if(r.rule.type == 'only_owners'){
                return true
            }
          })
          if(onlyOwners){
            if(this.$auth.user.type =='owner' || this.$auth.user.type =='admin'){
              return z
            }
          } else {
            return z
          }
        })
        return zones
      },
    }
  }

</script>


</script>

<style>

</style>
