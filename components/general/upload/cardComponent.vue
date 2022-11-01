<template>
  <v-card class="rounded-lg">
    <v-card-title>
      <span v-if="file.name">{{file.name.substr(0,7)}}</span>
      <v-spacer></v-spacer>
      <v-btn fab x-small color="red" @click="deleteImg(file)">
        <v-icon class="white--text">mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="d-flex justify-center">
      <template v-if="checkIfImage(file)">
        <v-img :src="getUrl(file)" width="100%" height="80" contain></v-img>
      </template>
      <template v-else>
        <v-icon size="80">mdi-file-outline</v-icon>
      </template>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions style="height:55" v-show="file.url">
      <v-btn block depressed :href="`https://forestapi.webcreativos.com.uy/`+file.url" target="_blank" class="rounded-lg"
        color="success darken-1">
        VER ARCHIVO&nbsp;
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
  export default {
    props: {
      file: Object
    },
    methods: {
      checkIfImage(file) {
        const checkIfImage = function (file) {
          if (file.includes('image')) {
            return true
          } else {
            return false
          }
        }
        if (file.mime) {
          return checkIfImage(file.mime)
        } else {
          return checkIfImage(file.type)

        }
      },
      deleteImg(file) {
        var temporalValue = this.value
        var confirm = window.confirm('Estas seguro que deseas eliminar este archivo?')
        if (confirm) {

          if (file.id) {
            this.$axios.delete('/upload/files/' + file.id)
          }
          this.$emit('input', temporalValue.filter(f => f !== file))
        }

      },
      getUrl(file) {
        if (file.url) {
          return `https://forestapi.webcreativos.com.uy${file.url}`
        } else {
          return URL.createObjectURL(file);
        }
      },

    }
  }

</script>
