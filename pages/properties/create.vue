<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:icon>
        <v-app-bar-nav-icon>
          <v-btn icon to="/">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
        </v-app-bar-nav-icon>
      </template>
      <template v-slot:title>
        Agregar apartamento
      </template>
      <template v-slot:subtitle>
        Agregue un nuevo apartamento a su edificio para llevar un mayor control del mismo.
      </template>
    </headersGeneralComponent>
    <v-stepper v-model="step" class="transparent" flat>
      <GeneralCardComponent class="ma-3 mb-0 rounded-b-0">
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">
            Datos del apartamento
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">
            Datos del propietario
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 3" step="3">
            Archivos adjuntos
          </v-stepper-step>
          <template v-if="apartment.in_rent">
            <v-divider></v-divider>
            <v-stepper-step step="4">
              Datos del inquilino
            </v-stepper-step>
          </template>
        </v-stepper-header>
      </GeneralCardComponent>
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <v-form ref="formApartments">
            <propertiesFormComponent class="ma-3 mt-0 rounded-t-0"></propertiesFormComponent>
          </v-form>

        </v-stepper-content>
        <v-stepper-content step="2" class="pa-0">
          <v-form ref="formOwners">
            <ownersFormComponent class="ma-3 mt-0 rounded-t-0"></ownersFormComponent>
          </v-form>
        </v-stepper-content>
        <v-stepper-content step="3" class="pa-0">
          <v-form ref="formFiles">
            <GeneralCardComponent class="ma-3 mt-0 rounded-t-0">
              <v-card-title class="text-subtitle-1 font-weight-regular">
                ARCHIVOS ADJUNTOS
              </v-card-title>
              <v-divider></v-divider>
              <generalUploadFilesComponent v-model="files"></generalUploadFilesComponent>
            </GeneralCardComponent>
          </v-form>
        </v-stepper-content>
        <v-stepper-content class="pa-0" step="4" v-if="true">
          <v-form ref="formRentals">
            <rentalsFormComponent class="ma-3 mt-0 rounded-t-0" v-model="rental"></rentalsFormComponent>
          </v-form>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <propertiesActionsBottomBarComponent v-model="step" :files="files"></propertiesActionsBottomBarComponent>
    <!-- error snackbar-->
    <v-snackbar v-model="errorInForm" color="red">
      Hubo un error al enviar, por favor revise los datos e intente nuevamente
      <v-btn text @click="errorInForm = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>

  export default {
    
    data() {
      return {
        files:{
          data:[]
        },
        step:1,
        rental: {
          habitant: {}
        }
      };
    },
    created() {
      //this.$store.dispatch("apartments/clear");
      this.$store.dispatch("habitants/clear");
      this.$store.dispatch("owners/clear");
      this.$store.dispatch("owners/clearUser");
      this.$store.dispatch("rentals/clearUser");
    },
    methods: {
      async createApartment2() {
        //check if apartment is in rent
      },
      async createRental() {
        if (this.apartment.in_rent) {
          //add habitant
          this.$store.dispatch('habitants/set', {
            apartment: apartment.id,
            type: 'tenant'
          })
          const {
            data: habitant
          } = await this.$store.dispatch("habitants/create");
          //add rental
          this.$store.dispatch('rentals/set', {
            apartment: apartment.id,
            habitants: habitant.id
          })
          await this.$store.dispatch("rentals/create");
          this.$store.dispatch("rentals/clear");
          //check if owner is in property
        }

      },
      async createOwner() {
        if (this.owner.in_property) {
          //add owner as habitant
          this.$store.dispatch('habitants/set', {
            name: this.owner.name,
            doc: this.owner.doc,
            apartment: apartment.id,
            type: 'owner'
          })
          const {
            data: habitant
          } = await this.$store.dispatch("habitants/create");

        }

        //create owner
        await this.$store.dispatch("owners/create", {
          apartment: apartment,
        });
      },
      async createApartment() {
        if (!this.$refs.form.validate())
          return;

        try {
          //create apartment
          const {
            data: apartment
          } = await this.$store.dispatch("apartments/create");
          //check if apartment is in rent
          if (this.apartment.in_rent) {} else if (this.owner.in_property) {
            //add owner as habitant
            this.$store.dispatch('habitants/set', {
              name: this.owner.name,
              doc: this.owner.doc,
              apartment: apartment.id,
              type: 'owner'
            })
            const {
              data: habitant
            } = await this.$store.dispatch("habitants/create");

          }

          //create owner
          await this.$store.dispatch("owners/create", {
            apartment: apartment,
          });
          this.upload(apartment.id)
          this.$store.dispatch("apartments/clear");
          this.$store.dispatch("habitants/clear");
          this.$store.dispatch("owners/clear");
          this.$router.go(-1);

        } catch (error) {
          console.log(error)
          this.errorInForm = true
          setTimeout(() => {
            this.errorInForm = false
          }, 3000);
        }
      },
      async upload(apartmentID) {
        if (this.files.length == 0) return
        var form = new FormData()
        form.append('ref', 'api::apartament.apartament')
        form.append('refId', apartmentID)
        form.append('field', 'files')
        this.files.forEach((file) => {
          if (file instanceof File) {
            form.append(`files`, file, file.name);
          }
        });
        await this.$axios.post('/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },

    },
    computed: {
      apartment() {
        return this.$store.getters["apartments/get"];
      },
      owner() {
        return this.$store.getters["owners/get"];
      },
    },
  }

</script>

<style>

</style>
