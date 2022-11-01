<template>
  <generalCardComponent v-ripple width="150" height="150" elevation="4" color="grey lighten-2" :to="to"
  class="border-card mr-4 d-flex justify-center flex-column flex-shrink-0">
    <v-card-title>
      <v-icon size="40" :color="color">{{icon}}</v-icon>
    </v-card-title>
    <v-card-subtitle class="font-weight-bold text-subtitle-1 text--darken-4 grey--text">
      <slot></slot>
    </v-card-subtitle>
  </generalCardComponent>
</template>

<script>
  export default {
    props: {
        to:{
            type:String,
            default:""
        },
      icon: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      }
    }
  }

</script>

<style scoped>
.v-application .border-card{
    border-color:#00000029!important;
}
</style>
