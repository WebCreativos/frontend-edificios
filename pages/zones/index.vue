<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Reservas
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="zonesModal = true">
          AGREGAR ZONA COMUN&nbsp;&nbsp;<v-icon>mdi-calendar</v-icon>
        </v-btn>
      </template>
    </headersGeneralComponent>
    <zonesReservationComponent>
      <template v-slot:calendarTitle>
        Calendario de reservas
      </template>
      <template v-slot:listTitle>
        Reservar en zona común
      </template>
    </zonesReservationComponent>
    <zonesDialogsCreateComponent v-model="zonesModal"></zonesDialogsCreateComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return{
        zonesModal: false
      }
    }
  }

</script>

<style>

</style>
