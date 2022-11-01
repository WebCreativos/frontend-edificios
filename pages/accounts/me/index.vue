<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:title>
        Hola {{$auth.user.name}}!
      </template>
      <template v-slot:subtitle>
        Bienvenido a tu cuenta
      </template>
    </headersGeneralComponent>
    <v-row>
        <v-col class="col-md-12" >
          <h4>
            Novedades
            <v-btn fab rounded depressed color="info" x-small>
              <v-icon color="white">ion-ios-hand</v-icon>
            </v-btn>
          </h4>
        </v-col>
      <v-col class="col-12">
       <newsCarouselComponent></newsCarouselComponent>
      </v-col>
    </v-row>
      <v-divider class="mt-4 mb-4"></v-divider>
    <template  v-for="(category,index) in categories" >
      <v-row :key="index">
        <v-col class="col-md-12" >
          <h4>
            {{category.name}}
            <v-btn fab rounded depressed :color="category.icon.color" x-small>
              <v-icon color="white">{{category.icon.name}}</v-icon>
            </v-btn>
          </h4>
        </v-col>
        <v-col class="col-12">
          <accountsCategoriesComponent :items="category.items"></accountsCategoriesComponent>
        </v-col>
      </v-row>
      <v-divider class="mt-4 mb-4" :key="'d'+index"></v-divider>
    </template> 
  </v-container>
</template>

<script>
  export default {
    name: 'accounts',
    created() {
      this.getApartment()
    },
    data() {
      return{
        categories:[{
          name:'Accesos',
          icon:{
            name:'ion-ios-key',
            color:'yellow'
          },
          items:[{
            name:'Reservas',
            icon:{
              name:'ion-ios-business',
              color:'blue'
            },
            to:'/accounts/me/reservations'
          },{
            name:'Acceso de invitados',
            icon:{
              name:'ion-ios-key',
              color:'yellow'
            },
            to:'/accounts/me/visits'
          }]
        },{
          name:'Mi apartamento',
          icon:{
            name:'mdi-wrench',
            color:'red'
          },
          items:[{
            name:'Ficha',
            icon:{
              name:'mdi-home',
              color:'primary'
            },
            to:'/accounts/me/apartment'
          },{
            name:'Facturas',
            icon:{
              name:'ion-ios-paper',
              color:'grey darken-2'
            },
            to:'/accounts/me/invoices'
          },{
            name:'Cuenta corriente',
            icon:{
              name:'ion-ios-cash',
              color:'green'
            },
            to:'/accounts/me/checkingaccounts'
          }]
        },{
          name:'Mi edificio',
          icon:{
            name:'mdi-information',
            color:'blue'
          },
          items:[{
            name:'Novedades',
            icon:{
              name:'ion-ios-hand',
              color:'yellow'
            },
            to:'/accounts/me/news'
          },{
            name:'Reportar un problema',
            icon:{
              name:'ion-ios-help',
              color:'red'
            },
            to:'/accounts/me/tickets'
          }]
        }]
      }
    },
    methods: {
      getApartment() {
        const apartmentId = this.$auth.user.data.apartment.id
        this.$store.dispatch('apartments/find', {
          id: apartmentId
        })
      },
    },
    computed: {
      item() {
        return {
          attributes: this.$store.getters['apartments/get']
        }
      }
    }

  }

</script>

<style>

</style>
