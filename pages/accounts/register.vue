<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-col class="col-12 d-flex justify-center">
      </v-col>
      <v-col class="col-12 col-md-8 col-lg-6">
        <GeneralCardComponent color="primary">
          <v-card-title class="d-flex justify-center">
            <v-avatar size="250">
              <v-img src="/icons/desktop.png" contain></v-img>
            </v-avatar>
          </v-card-title>
          <v-divider></v-divider>
          <GeneralCardTitleComponent class="d-flex justify-center white--text text-h5">
            Registrate ahora en Forest
          </GeneralCardTitleComponent>

          <v-divider></v-divider>
          <v-card-text class="pt-0">
            <v-stepper class="rounded-xl transparent" elevation="0" v-model="step">
              <v-stepper-header class="elevation-0">
                <v-stepper-step :complete="step > 1" step="1">
                  <span class="font-weight-regular white--text">Datos del edificio</span>
                </v-stepper-step>
                <v-divider class="white"></v-divider>
                <v-stepper-step :complete="step > 2" step="2" class="font-weight-regular white--text">
                  <span class="font-weight-regular white--text">Mi cuenta</span>
                </v-stepper-step>
              </v-stepper-header>
              <v-divider></v-divider>
              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card-text>
                    <v-form ref="formBuilding" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col class="col-12">
                          <formsFieldsTextComponent label="Nombre del edificio" label-color="white--text"
                            v-model="building.name" :rules="rules.required" prepend-inner-icon="mdi-office-building">
                          </formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-12">
                          <formsFieldsTextComponent label="Direccion" label-color="white--text"
                            v-model="building.address" :rules="rules.required" prepend-inner-icon="mdi-map-marker">
                          </formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-12">
                          <formsFieldsSelectComponent :items="['Maldonado']" label-color="white--text"
                            v-model="building.location" :rules="rules.required" prepend-inner-icon="mdi-map"
                            label="Localidad">
                          </formsFieldsSelectComponent>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text-color="white" height="40" elevation="5"
                      class="secondary white--text rounded-lg font-weight-regular" @click="validBuilding()">
                      <span>Siguiente</span>
                      <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-stepper-content>
                <v-stepper-content step="2">
                  <v-card-text>
                    <v-form ref="formAccount" v-model="valid" lazy-validation>
                      <v-row>
                        <v-col class="col-12">
                          <formsFieldsTextComponent label="Nombre" label-color="white--text" :rules="rules.required" v-model="account.name"
                            prepend-inner-icon="ion-ios-person">
                          </formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-12">
                          <formsFieldsTextComponent label="Documento de identidad" :rules="rules.min" label-color="white--text"
                            v-model="account.username" type="number" prepend-inner-icon="ion-ios-document">
                          </formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-12">
                          <formsFieldsTextComponent v-model="account.phone"  :rules="rules.required" label-color="white--text"
                            prepend-inner-icon="mdi-phone" label="Telefono">
                          </formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-12">
                          <formsFieldsPasswordComponent v-model="account.password" :rules="rules.required"
                            label-color="white--text" label="Password" required>
                          </formsFieldsPasswordComponent>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn fab color="yellow" small class="white--text rounded-lg mr-3" @click="step--">
                      <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn text-color="white" height="40" elevation="5"
                      class="secondary white--text rounded-lg font-weight-regular" @click="validAccount()">
                      Guardar
                      <v-icon>mdi-save</v-icon>
                    </v-btn>
                  </v-card-actions>

                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-card-text class="text-center d-flex align-center justify-center flex-column class py-12">
                    <img width="200" contain src="/logo.png">
                    <h2 class="font-weight-regular white--text">Estamos creando tu cuenta!</h2>
                    <v-progress-circular indeterminate color="secondary" size="150" width="14" class="mt-4">
                    </v-progress-circular>
                  </v-card-text>

                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>

          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    layout: 'empty',
    data() {
      return {
        account: {
        },
        building: {
          location:'Maldonado'
        },

        step: 1,
        valid: true,
        name: '',


        rules: {
          min:[v => v.length >= 8 || 'Minimo 8 caracteres'],
          required: [v => !!v || 'Este campo es requerido']
        },
        showPassword: false,
      }
    },
    methods: {
      validBuilding() {
        if (this.$refs.formBuilding.validate()) {
          this.step++
        }
      },
      validAccount() {
        console.log(this.$refs.formAccount)
        if (this.$refs.formAccount.validate()) {
          this.account.email = this.account.username + '@' + this.building.name.replace(/\s+/g, '') + '.com'
          this.account.password = this.account.username
          axios.post(this.$axios.defaults.baseURL+'/buildings', {
              data: this.building
            })
            .then((data) => {
              const buildingId = data.data.data.id
              this.account.building = buildingId
              this.account.type = 'admin'
              axios.post(this.$axios.defaults.baseURL+'/users', this.account)
                .then(async (data) => {
                  this.step++
                }).then(async () => {
                  await this.$store.dispatch('users/login', this.account)
                })
                .catch((error) => {
                  console.log(error)
                })
            })

        }
      }

    }
  }

</script>

<style>

</style>
