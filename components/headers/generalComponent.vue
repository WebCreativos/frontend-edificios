<template>
  <v-app-bar app dense flat :color="colorAppBar" extension-height="60" class="border-bottom">
      <slot name="icon"></slot>
    <v-toolbar-title class="font-weight-bold text-h6" :class="textColorAppBar">
      <slot name="title"></slot>
    </v-toolbar-title>
    <template v-slot:extension>
      <h4 class="font-weight-semi-regular text--darken-2" :class="textColorAppBar">
        <slot name="subtitle"></slot>
      </h4>
    </template>
  </v-app-bar>
</template>

<script>
  export default {
    computed: {
      textColorAppBar() {
        if (this.$vuetify.breakpoint.smAndDown) {
          return 'white--text'
        } else {
          return 'black--text'
        }
      },
      colorAppBar() {
        if (this.$vuetify.breakpoint.smAndDown) {
          return 'primary'
        } else {
          return 'grey lighten-4'
        }
      }
    }

  }

</script>

<style scoped>
</style>
