<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Reservas
      </template>
    </headersGeneralComponent>
    <zonesReservationComponent :apartment="apartment.id">
      <template v-slot:calendarTitle>
        Mi calendario de reservas
      </template>
      <template v-slot:listTitle>
        Reservar en zona común
      </template>
    </zonesReservationComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        apartment:this.$auth.user.data.apartment
      }
    }
  }

</script>

<style>

</style>
