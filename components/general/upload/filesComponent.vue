<template>
  <v-card>
    <v-card-text>
      <div class="d-flex justify-center" v-if="!readonly">
        <v-sheet color="indigo lighten-4" width="100%" height="150"
          class="rounded d-flex justify-center align-center dotted-border p-relative" @click="selectPhoto">
          <v-icon size="80" v-show="!showPreview">mdi-file-plus-outline</v-icon>
        </v-sheet>
        <input type="file" multiple style="display:none;" ref="uploadFile" @change="onFileChange" />
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col class="col-md-3 col-12 mt-3" v-for="(file,index) in filesList" :key="`f${index}`">
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
              <v-btn block depressed :href="getUrl(file)" target="_blank"
                class="rounded-lg" color="success darken-1">
                VER ARCHIVO&nbsp;
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'DragAndDropPhotoCard',
    props: {
      value: Array,
      readonly: {
        default: false,
        type: Boolean
      }
    },
    data() {
      return {
        showPreview: false
      }
    },
    mounted() {},
    methods: {
      getUrl(file) {
        if(file.url)  {
          return file.url
        }
         else {
          return URL.createObjectURL(file);
        }
      },
      selectPhoto(event) {
        this.$refs.uploadFile.click()
      },
      onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length)
          return
        this.$emit('input', [...this.value || [], ...[...files]])
      },
      deleteImg(file) {
        var temporalValue = this.value
        var confirm = window.confirm('Estas seguro que deseas eliminar este archivo?')
        if (confirm) {

          if (file.id) {
            this.$axios.delete('/upload/files/' + file.id)
          }
          this.$emit('input', {
            data: temporalValue.filter(f => f !== file)
          })
        }

      },
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
      }

    },
    computed: {
      filesList() {
        if (this.value != null) {
          console.log(this.value)
          return this.value.filter((file) => {
            if (file instanceof File) {
              return file
            } else if (Object.keys(file).length) {
              return file
            }
          })

        } else {
          return []
        }
      }
    }
  }

</script>

<style scoped>
  .dotted-border {
    border: 1px solid;
    border-style: dotted;
  }

</style>
