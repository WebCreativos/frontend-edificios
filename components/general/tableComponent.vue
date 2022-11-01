<template>
  <GeneralCardComponent>
    <v-card-title class="text-subtitle-1 font-weight-regular">
      <formsFieldsTextButtonComponent @click="search" label="Buscar...">
        <template v-slot:icon>
          <v-icon>mdi-magnify</v-icon>
        </template>
      </formsFieldsTextButtonComponent>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-card-actions></v-card-actions>
  </GeneralCardComponent>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      search:{
        type: Function,
        required: true
      },
      data: {
        type: Object,
        default: {}
      }
    },
    methods:{
      search(q) {
        this.$store.dispatch('apartments/findAll', q)
      }
    }
  }

</script>

<style>

</style>
