<template>
  <div>
    <v-btn-toggle rounded background-color="primary" class="elevation-12" dense color="primary">
      <v-btn icon outlined @click="singlePropertyModal = true">
        <v-icon color="white" class="icon-shadow">mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon outlined :to="`/properties/update/${data.id}`">
        <v-icon color="white" class="icon-shadow">mdi-pencil</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-dialog v-model="singlePropertyModal" width="1000" persistent :fullscreen="toggleFullScreen">
      <cardsSinglePropertyCardComponent :getData="singlePropertyModal" :data="data">
        <v-toolbar elevation="0" color="primary" dense>
          <v-spacer></v-spacer>
          <v-btn icon color="primary rounded-lg" @click="toggleFullScreen = !toggleFullScreen">
            <v-icon v-if="toggleFullScreen" color="white">mdi-window-minimize</v-icon>
            <v-icon v-else color="white">mdi-window-maximize</v-icon>
          </v-btn>
          <v-btn icon color="primary rounded-lg" @click="singlePropertyModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </cardsSinglePropertyCardComponent>
    </v-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  export default {
    props: {
      data: {
        type: Object,
        required: true,
        default: {
          attributes: {
            amenities: {
              data: []
            }
          }
        }
      }
    },
    filters: {
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
      formatHabitants(value, key) {
        if (!value) return "-"
        if (value.length != 0) {
          return value[0][key]
        }
      },
    },
    data() {
      return {
        singlePropertyModal: false,
        toggleFullScreen: false
      }
    },
    mounted() {},
    methods: {
    },
    computed: {

    },
    watch: {
      singlePropertyModal(val) {
        if (!val) {
          this.$store.dispatch("rentals/clear")
          this.toggleFullScreen = false
          this.$root.$emit('toggleFullScreen', false)
        } 
      }
    }
  }

</script>

<style>

</style>
