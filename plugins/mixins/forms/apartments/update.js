import {
    mapFields
  } from 'vuex-map-fields';

export default {
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



    async updateUser(user, type) {
      user.building =this.$auth.user.building.id
      this.$store.dispatch('users/set', user)
      if (!user.id) {
        const {
          data: user
        } = await this.$store.dispatch("users/create", {
          type: type
        })
        return user
      } else {
        const {
          data: user
        } = await this.$store.dispatch("users/update")
        return user
      }
    },
    async updateOwner() {
      const ownerUser = this.$store.getters['owners/user']
      var user = await this.updateUser(ownerUser, 'owner')

      this.$store.dispatch('owners/set', {
        apartment: this.$route.params.id,
        user: user.id
      })

      if (this.owner.id) {
        await this.$store.dispatch('owners/update')
      } else {
        await this.$store.dispatch('owners/create')
      }
    },
    async updateRentals() {
      const rentalUser = this.$store.getters['rentals/user']
      var user = await this.updateUser(rentalUser, 'tenant')
      console.log(user)
      if(user == false) {
        this.errorInForm = true
        return
      }

      this.$store.dispatch('rentals/set', {
        apartment: this.$route.params.id,
        user: user.id
      })
      if (this.rental.id) {
        await this.$store.dispatch('rentals/update')
      } else {
        await this.$store.dispatch('rentals/create')
      }
    },
    async upload() {
        if (this.files.length == 0) return
        var form = new FormData()
        form.append('ref', 'api::apartament.apartament')
        form.append('refId', this.apartment.id)
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
    bottomBarColor() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'primary'
      } else {
        return 'grey lighten-4'
      }
    },
    ...mapFields('apartments', [
      'files',
    ]),
    apartment() {
      return this.$store.getters['apartments/get']
    },
    owner() {
      return this.$store.getters['owners/get']
    },
    rental() {
      return this.$store.getters['rentals/get']
    }
  },

}
