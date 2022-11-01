<template>
  <v-container>
    <HeadersGeneralComponent elevation="6">
      <template v-slot:title>
        Staff
      </template>
      <template v-slot:subtitle>
        <v-btn large color="secondary black--text rounded-lg font-weight-regular" @click="modalStaff = true">
          <v-icon>mdi-plus</v-icon>&nbsp;AGREGAR STAFF
        </v-btn>
      </template>
    </HeadersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <GeneralCardComponent elevation="6">
          <v-card-title style="background:#333350" class="fill-width rounded-t-xl">
            <v-tabs v-model="tab" hide-slider slider-color="primary" background-color="primary"
              active-class="active-tab" grow>
              <v-tab ripple :value="1">
                <span class="font-weight-black white--text">EMPLEADOS</span>
              </v-tab>
              <v-tab ripple :value="2">
                <span class="font-weight-black white--text">ENTRADAS</span>
              </v-tab>
              <v-tab ripple :value="3">
                <span class="font-weight-black white--text">TAREAS</span>
              </v-tab>
            </v-tabs>
          </v-card-title>
          <v-card-text class="my-3">
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <GeneralCardComponent>
                  <v-card-text>
                    <v-data-table hide-default-footer :headers="headers" :items="staffList.data">

                    </v-data-table>
                  </v-card-text>
                </GeneralCardComponent>
              </v-tab-item>
              <v-tab-item>
                <staffEntriesComponent :staffItems="staffList.data"></staffEntriesComponent>
              </v-tab-item>
              <v-tab-item>
                <GeneralCardComponent outlined>
                  <GeneralCardTitleComponent>
                    Lista de tareas
                    <v-spacer></v-spacer>
                    <v-btn color="secondary black--text rounded-lg font-weight-regular" @click="modalTask = true">
                      <v-icon>mdi-plus</v-icon>&nbsp;nueva tarea
                    </v-btn>
                  </GeneralCardTitleComponent>
                  <v-card-text>
                    <v-expand-transition>
                      <GeneralCardComponent v-show="modalTask" outlined>
                        <GeneralCardTitleComponent>Nueva tarea</GeneralCardTitleComponent>
                        <v-card-text>
                          <v-form ref="formTask">
                            <v-row>
                              <v-col class="col-12">
                                <FormsFieldsSelectComponent v-model="task.staff" :rules="rules.required" :items="staffList.data" item-value="id"
                                  item-text="name" return-object prepend-inner-icon="mdi-account"
                                  label="ASIGNADA A">
                                </FormsFieldsSelectComponent>
                              </v-col>
                              <v-col class="col-12">
                                <v-textarea outlined class="elevation-3 rounded-lg" :rules="rules.required" label="Descripcion de la tarea"
                                  v-model="task.description"></v-textarea>
                              </v-col>
                              <v-col class="col-12">
                                <FormsFieldsTextComponent type="date" label="Fecha" :rules="rules.required"
                                  v-model="task.date">
                                </FormsFieldsTextComponent>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" class="font-weight-regular rounded-lg" @click="modalTask = false">
                            CERRAR
                          </v-btn>
                          <v-spacer></v-spacer>
                          <v-btn color="secondary" class="font-weight-regular rounded-lg" @click="addTask()">Agregar
                            tarea
                          </v-btn>
                        </v-card-actions>
                      </GeneralCardComponent>
                    </v-expand-transition>
                  </v-card-text>
                  <v-card-title>
                  </v-card-title>
                  <v-card-text>
                    <v-calendar :events="taskList" :type="type"></v-calendar>
                  </v-card-text>
                </GeneralCardComponent>
              </v-tab-item>

            </v-tabs-items>
          </v-card-text>
        </GeneralCardComponent>
      </v-col>
    </v-row>
    <template>
      <v-dialog v-model="modalStaff" width="700">
        <GeneralCardComponent>
          <GeneralCardTitleComponent class="primary white--text">
            Agregar staff
            <v-spacer></v-spacer>
            <v-btn icon @click="modalStaff = false">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </GeneralCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text class="pa-3">
            <v-form ref="form">
              <v-row>
                <v-col class="col-12">
                  <FormsFieldsTextComponent label="Nombre" :rules="rules.required"  v-model="staff.name"></FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-4">
                  <FormsFieldsSelectComponent :items="['CI', 'PASAPORTE']" :rules="rules.required"  label="Documento" type="number"
                    v-model="staff.doc_type"></FormsFieldsSelectComponent>
                </v-col>
                <v-col class="col-8">
                  <FormsFieldsTextComponent label="_" type="number" :rules="rules.required"  v-model="staff.doc">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de entrada</label>
                  <v-menu ref="entrymenu" v-model="hourEntryMenu" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="staff.entry_hour" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{on}">
                      <v-btn block class="black--text rounded-lg" color="white" x-large v-on="on">
                        {{ staff.entry_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-time-picker v-if="hourEntryMenu" v-model="staff.entry_hour" full-width
                      @click:minute="$refs.entrymenu.save(staff.entry_hour)"></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col class="col-12 col-sm-6">
                  <label class="font-weight-regular mb-2 grey--text text--darken-4 text-uppercase text-subtitle-2">Hora
                    de salida</label>
                  <v-menu ref="exitmenu" v-model="hourExitMenu" :close-on-content-click="false" :nudge-right="40"
                    :return-value.sync="staff.exit_hour" transition="scale-transition" offset-y max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{on}">
                      <v-btn block class="black--text rounded-lg" color="white" v-on="on" x-large
                        @click="hourExitMenu = !hourExitMenu">
                        {{ staff.exit_hour }}&nbsp;&nbsp;<v-icon>mdi-clock-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-time-picker v-if="hourExitMenu" v-model="staff.exit_hour" full-width
                      @click:minute="$refs.exitmenu.save(staff.exit_hour)"></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsTextComponent label="Telefono" :rules="rules.required"  type="number" v-model="staff.phone">
                  </FormsFieldsTextComponent>
                </v-col>
                <v-col class="col-6">
                  <FormsFieldsSelectComponent label="Area" :rules="rules.required"  item-text="name" value="name"
                    :items="['Mantenimiento']" v-model="staff.area"></FormsFieldsSelectComponent>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary black--text rounded-lg font-weight-regular" class="rounded-lg" @click="addStaff()">
              AGREGAR STAFF&nbsp;&nbsp;
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </v-card-actions>
        </GeneralCardComponent>
      </v-dialog>
    </template>
    <v-snackbar v-model="errorInForm" color="red">
      Hubo un error en el formulario. revise nuevamente los datos
      <v-btn color="white" text @click="errorInForm = false">
        <v-icon color="black">mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </v-container>
</template>


<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        rules: {
          required: [v => !!v || 'Este campo es requerido']
        },
        hourEntryMenu: false,
        hourExitMenu: false,
        modalStaff: false,
        modalTask: false,
        tab: 0,
        task: {},
        taskList: {},
        staffList: {},
        staff: {},
        errorInForm: false,
        headers: [{
          text: 'Nombre',
          align: 'left',
          sortable: false,
          value: 'name'
        }, {
          text: 'Documento',
          align: 'left',
          sortable: false,
          value: 'doc'
        },{
          text: 'Hora de entrada',
          align: 'left',
          sortable: false,
          value: 'entry_hour'
        },{
          text: 'Hora de salida',
          align: 'left',
          sortable: false,
          value: 'exit_hour'
        },{
          text: 'Telefono',
          align: 'left',
          sortable: false,
          value: 'phone'
        }, {
          text: 'Area',
          align: 'left',
          sortable: false,
          value: 'area'
        }],
        focus: null,
        now: null,
        type: "month",
      }
    },
    created() {
      this.now = moment().format("YYYY-MM-DD");
      this.$store.dispatch('areas/find')
      this.getStaff()
      this.getTasks()
    },
    methods: {

      viewDay({
        date
      }) {
        this.focus = date;
        this.now = date
        console.log(date)
        this.type = "day";
      },


      addStaff() {
        if(!this.$refs.form.validate()) {
          this.errorInForm = true
          return
        }

        this.$axios.post('/staffs', {
            data: this.staff
          })
          .then(() => {
            this.staff = {}
            this.getStaff()
            this.modalStaff = false
          })
      },
      getTasks() {
        this.$axios.get('/tasks/?populate=*')
          .then(response => {
            this.taskList = response.data.data.map(task => {
              return {
                name: `${task.staff.name} - ${task.description.substr(0,10)}`,
                zone: `${task.description}`,
                staff: `${task.staff.name}`,
                start: `${task.date} 00:00:00`,
                end: `${task.date} 23:59:00`,
                allDay: true,
              }
            });
          })
      },
      addTask() {
        //date

        const checkDateBefore = moment(this.task.date).isBefore(moment().format("YYYY-MM-DD"))

        if(!this.$refs.formTask.validate() || checkDateBefore) {
          this.errorInForm = true
          return
        }
        this.task.staff = this.task.staff.id
        this.$axios.post('/tasks', {
            data: this.task
          })
          .then(() => {
            this.task = {}
            this.getTasks()
            this.modalTask = false
          })
      },
      getStaff() {
        this.$axios.get('/staffs')
          .then(response => {
            this.staffList = response.data
          })
      },
    },
    computed: {
      areas() {
        return this.$store.getters['areas/getList']
      }
    }
  }

</script>
