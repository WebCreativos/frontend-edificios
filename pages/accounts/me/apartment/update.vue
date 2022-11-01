<template>
  <v-container>
    <headersGeneralComponent>
      <template v-slot:title>
        Editar mi apartamento
      </template>
    </headersGeneralComponent>
    <v-form ref="form">
      <v-row>
        <v-col class="col-12">
          <propertiesFormComponent readonly></propertiesFormComponent>
        </v-col>
        <v-col class="col-12">
          <ownersFormComponent readonly></ownersFormComponent>
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
  </v-container>
</template>

<script>
  var qs = require('qs');
  import {
    mapFields
  } from 'vuex-map-fields';
  import updateApartmentsMixins from '~/plugins/mixins/forms/apartments/update.js'

  export default {
    mixins: [updateApartmentsMixins],
    data() {
      return {
        step: 1,
      }
    },
    mounted() {
      this.getApartment()
    },
    methods: {
      async getApartment() {
        await this.$store.dispatch('apartments/find', {
          id: this.$auth.user.data.apartment.id
        })

        const owner = await this.$store.dispatch('owners/find', {
          apartment: this.$auth.user.data.apartment.id
        })
        this.$store.dispatch('owners/setUser', {
          id: owner.user.id,
          ...owner.user
        })

        if (this.apartment.in_rent) {
          const rental = await this.$store.dispatch('rentals/find', {
            apartment: this.$auth.user.data.apartment.id
          })
          this.$store.dispatch('rentals/setUser', {
            id: rental.user.id,
            ...rental.user
          })
        }
      },
      async updateApartment() {
        if (!this.$refs.form.validate()) return
        await this.updateOwner()
        await this.$store.dispatch('apartments/update')
        //create owner
        this.upload()
        this.$router.go(-1)
      },
      computed: {
        ...mapFields('apartments', [
          'files',
        ]),
        apartment() {
          return this.$store.getters['apartments/get']
        }
      },
    }
  }

</script>

<style>

</style>
