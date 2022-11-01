<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Editar apartamento
      </template>
      <template v-slot:subtitle>
        <h4 class="font-weight-semi-regular grey--text text--darken-2">
          Agregue un nuevo apartamento a su edificio para llevar un mayor control del mismo.
        </h4>
      </template>
    </headersGeneralComponent>
    <v-form ref="form">
      <v-row>
        <v-col class="col-12">
          <propertiesFormComponent></propertiesFormComponent>
        </v-col>
        <v-col class="col-12">
          <OwnersFormComponent></OwnersFormComponent>
        </v-col>
        <v-col class="col-12" v-if="apartment.in_rent">
          <rentalsFormComponent></rentalsFormComponent>
        </v-col>
        <v-col class="col-12">
          <GeneralCardComponent>
            <v-card-title class="text-subtitle-1 font-weight-regular">
              ARCHIVOS ADJUNTOS
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <generalUploadFilesComponent v-model="files"></generalUploadFilesComponent>
            </v-card-text>
          </GeneralCardComponent>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col class="col-12 d-flex">
      </v-col>
    </v-row>
    <generalBottomBarComponent :color="bottomBarColor" app>
      <!-- create button previous step -->
      <v-btn text-color="white" class="secondary black--text rounded-lg font-weight-regular" @click="updateApartment()">
        Guardar apartamento
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </generalBottomBarComponent>
    <v-snackbar v-model="errorInForm" color="red">
      Hubo un error al guardar, por favor revise los datos e intente nuevamente
      <v-btn text @click="errorInForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  var qs = require('qs');
  import updateApartmentsMixins from '~/plugins/mixins/forms/apartments/update.js'

  export default {
    mixins: [updateApartmentsMixins],
    data() {
      return {
        step: 1,
        errorInForm: false,
      }
    },
    created() {
      //this.$store.dispatch("apartments/clear");
      this.$store.dispatch("rentals/clearUser");
    },

    mounted() {
      this.getApartment()
    },
    methods: {
      async getApartment() {
        await this.$store.dispatch('apartments/find', {
          id: this.$route.params.id
        })

        const owner = await this.$store.dispatch('owners/find', {
          apartment: this.$route.params.id
        })
        this.$store.dispatch('owners/setUser', {
          id: owner.user.id,
          ...owner.user
        })

        if (this.apartment.in_rent) {
          const rental = await this.$store.dispatch('rentals/find', {
            apartment: this.$route.params.id
          })
          this.$store.dispatch('rentals/setUser', {
            id: rental.user.id,
            ...rental.user
          })
        }
      },
      async updateApartment() {
        if (!this.$refs.form.validate()) {
          this.errorInForm = true
          return
        }
        await this.updateOwner()
        if (this.apartment.in_rent) {
          await this.updateRentals()
        }
        await this.$store.dispatch('apartments/update')
        //create owner
        if (this.apartment.in_rent) {}

        await this.upload()
        this.$router.go(-1)
      },

    },
  }

</script>

<style>

</style>
