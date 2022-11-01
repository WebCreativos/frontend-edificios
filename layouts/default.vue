<template>
  <v-app dark>
    <generalNavigationComponent></generalNavigationComponent>
    <v-main class="pb-16">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>


  export default {
    //middleware: 'auth',
    created() {
      if(!this.$auth.loggedIn) {
        this.$router.push('/accounts/login')
      }
      if(this.$auth.user.type != 'admin') {
        this.$router.push('/accounts/me')
      } 
    },
    mounted() {
    },
    methods: {
    },
    computed: {
      navigationTypeComponent() {
        if(this.$auth.user.type == 'admin') {
          return 'generalNavigationAdminComponent'
        } else {
          return 'generalNavigationUserComponent'
        }
      }
    }
}

</script>

<style lang="scss">
  .navigation-drawer {
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }

  .btn-navigation {
    border: 1px solid #80808024;
    border-radius: 15px !important;
    padding: 0 !important;

    .v-btn__content {
      width: 100%;
      justify-content: start;
      height: 100%;
      align-items: center;
      margin-left: 40px;
    }

    span {
      text-transform: capitalize;
      font-weight: 300;
      margin-left: 10px;
    }
  }

  .btn-navigation-active {
    span {
      color: white;
    }
  }

</style>
