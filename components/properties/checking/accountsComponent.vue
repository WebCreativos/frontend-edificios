<template>
  <v-card outlined class="rounded-lg">
    <v-card-title de class="primary py-2">
      <v-tabs height="40" :vertical="$vuetify.breakpoint.smAndDown" v-model="tab" hide-slider slider-color="primary"
        background-color="primary" active-class="active-tab" grow>
        <v-tab ripple :value="1">
          <span class="font-weight-black white--text">CUENTA EN USD</span>
        </v-tab>
        <v-tab ripple :value="2">
          <span class="font-weight-black white--text">CUENTA EN UYU</span>
        </v-tab>
      </v-tabs>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item :value="0">
        <propertiesCheckingSingleAccountComponent v-model="accounts" :readOnly="readOnly" :apartment="apartment" currency="USD">
        </propertiesCheckingSingleAccountComponent>
      </v-tab-item>
      <v-tab-item :value="1">
        <propertiesCheckingSingleAccountComponent v-model="accounts" :readOnly="readOnly" :apartment="apartment" currency="UYU">
        </propertiesCheckingSingleAccountComponent>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import qs from 'qs'
  export default {
    props: {
      readOnly:{
        type: Boolean,
        default: false
      },
      apartment: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        tab: 0,
        rules: [
          (v) => !!v || 'Campo requerido',
        ],
      }
    },
    created() {
      this.$store.dispatch('checkingaccounts/findAll',{
        filters:{
          apartment: this.apartment.id
        }
      })
    },
    computed: {
      accounts() {
        return this.$store.getters['checkingaccounts/getList']
      }
    },
  }

</script>

<style>

</style>
