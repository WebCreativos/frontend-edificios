<template>
  <v-container fill-height>
    <v-row justify="center" align-content="center">
      <v-col class="col-12 col-md-8 col-lg-6">
        <GeneralCardComponent color="primary">
          <v-card-title class="d-flex justify-center">
            <v-avatar size="250">
              <v-img src="/icons/desktop.png" contain></v-img>
            </v-avatar>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-tabs v-model="tab" hide-slider slider-color="primary" background-color="primary"
              active-class="active-tab" grow>
              <v-tab ripple :value="1">
                <span class="font-weight-black white--text">INICIAR SESION</span>
              </v-tab>
              <v-tab ripple :value="2">
                <span class="font-weight-black white--text">REGISTRARSE</span>
              </v-tab>
            </v-tabs>
          </v-card-subtitle>
          <v-tabs-items v-model="tab">
            <v-tab-item class="primary">
              <v-divider></v-divider>
              <GeneralCardTitleComponent class="d-flex justify-center white--text text-h5">
                Entra ahora en Forest
              </GeneralCardTitleComponent>
              <v-divider></v-divider>
              <v-card-text>
                <v-form ref="form">
                  <v-row>
                    <v-col class="col-12">
                      <FormsFieldsTextComponent v-model="user.username" prepend-inner-icon="mdi-doc"
                        :rules="[rules.min]" label-color="white--text" label="Documento" type="number" required>
                      </FormsFieldsTextComponent>
                    </v-col>
                    <v-col class="col-12">
                      <formsFieldsPasswordComponent v-model="user.password" :rules="rules.required"
                        label-color="white--text" label="Password" required>
                      </formsFieldsPasswordComponent>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="secondary" class="secondary white--text rounded-lg font-weight-regular" @click="login()"
                  :loading="loading" large block>
                  Entrar&nbsp;<v-icon>mdi-login</v-icon>
                </v-btn>
              </v-card-actions>

            </v-tab-item>
            <v-tab-item class="primary">
              <v-divider></v-divider>
              <GeneralCardTitleComponent class="d-flex justify-center white--text text-h5">
                Registrate ahora en Forest
              </GeneralCardTitleComponent>
              <v-divider></v-divider>
              <v-card-text>
                <accountsRegisterComponent></accountsRegisterComponent>
              </v-card-text>
            </v-tab-item>
          </v-tabs-items>
        </GeneralCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    auth: false,

    layout: 'empty',
    data: () => ({
      loading: false,
      rules: {
        required: [value => !!value || 'Required.'],
        min: [v => v.length <= 8 || 'Min 8 characters']
      },
      tab: 0,
      user: {
        username: '',
        password: ''
      },
    }),
    methods: {
      async login() {
        if (!this.$refs.form.validate()) return
        this.loading = true
        this.$store.dispatch('users/login', this.user)
          .then(() => {
            this.loading = false
            this.$router.push('/')
          }).catch(() => {
            this.loading = false
          })
      }
    }
  }

</script>

<style>

</style>
