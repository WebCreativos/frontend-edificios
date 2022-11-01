<template>
  <v-card-title v-bind="$attrs" class="font-weight-regular">
    <slot></slot>
  </v-card-title>
</template>

<script>
  export default {
    name: 'cardTitle',
  }
</script>