export default {
  data() {
    return {
      errorUserExists: [],
    }
  },
  methods: {
    async checkIfUserExists(value) {
      const exists = await this.$store.dispatch('users/checkIfExists', value)
      this.errorUserExists = exists && !this.id ? ['Ya existe un usuario con ese documento'] : []
    }
  },
}
