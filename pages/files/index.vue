<template>
  <v-container>
    <HeadersGeneralComponent elevation="6">
      <template v-slot:title>
        Biblioteca de documentos
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" :disabled="showFormFiles"
          @click="showFormFiles = true">
          <v-icon>mdi-plus</v-icon>&nbsp;SUBIR ARCHIVOS
        </v-btn>
      </template>
    </HeadersGeneralComponent>

    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent>
          <GeneralCardTitleComponent class="primary white--text">Biblioteca de documentos</GeneralCardTitleComponent>
          <v-card-text>
            <v-expand-transition>

              <GeneralCardComponent v-show="showFormFiles" outlined class="mt-4">
                <v-card-title>
                  Subir archivos
                </v-card-title>
                <v-card-text>
                  <generalUploadFilesComponent v-model="newFilesUpload"></generalUploadFilesComponent>

                </v-card-text>
                <v-card-actions>
                  <v-btn @click="showFormFiles = false" color="primary" class="rounded-lg">SALIR
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="upload()" :disabled="newFilesUpload.length == 0"
                    color="secondary rounded-lg font-weight-regular">Subir archivos&nbsp;&nbsp;<v-icon>mdi-upload
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </GeneralCardComponent>
            </v-expand-transition>
          </v-card-text>
          <v-card-text class="py-3">
            <v-row>
              <v-col class="col-md-3 col-12" v-for="file in files" :key="file.id">
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
                      <v-img :src="file.url" width="100%" height="80" contain></v-img>
                    </template>
                    <template v-else>
                      <v-icon size="80">mdi-file-outline</v-icon>
                    </template>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions style="height:55" v-show="file.url">
                    <v-btn block depressed :href="file.url" target="_blank"
                      class="rounded-lg" color="success darken-1">
                      VER ARCHIVO&nbsp;
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>

              </v-col>
            </v-row>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <generalModalSuccessComponent :action="()=>{
      this.newFilesSuccessModal = false
      }" v-model="newFilesSuccessModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Archivos subidos correctamente!</strong>
        </p>
      </template>
    </generalModalSuccessComponent>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        showFormFiles: false,
        files: [],
        newFilesSuccessModal: false,
        newFilesUpload:[]
      }
    },
    mounted() {
      this.getFiles()
    },
    methods: {
      getFiles() {
        this.$axios.get('/upload/files')
          .then(response => {
            this.files = response.data
          })
      },
      checkIfImage(file) {
        console.log(file)
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
        var confirm = window.confirm('Estas seguro que deseas eliminar este archivo?')
        if (confirm) {
            this.$axios.delete('/upload/files/' + file.id)
            .then(()=>{
                this.getFiles()
            })
        }

      },
      async upload() {
        if (this.newFilesUpload.length == 0) return
        var form = new FormData()
        this.newFilesUpload.data.forEach((file) => {
          if (file instanceof File) {
            form.append(`files`, file, file.name);
          }
        });
        await this.$axios.post('/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
          this.newFilesSuccessModal = true
          this.newFilesUpload = {
            data: []
          }
          this.getFiles()
        })
      },

    }
  }

</script>
