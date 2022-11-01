<template>
  <v-input>
    <v-row>
      <v-col class="col-9">
        <v-row>
          <v-col :class="(selectedRule.rule.type=='before_to')?'col-6':'col-12'">
            <FormsFieldsSelectComponent class="rounded-r-0" label="Regla" return-object :filled="update" :readonly="update" v-model="selectedRule.rule"
              :items="items" item-value="id" item-text="name"></FormsFieldsSelectComponent>
          </v-col>
          <v-col :class="(selectedRule.rule.type=='before_to')?'col-6':'col-12'">
            <formsFieldsTextComponent class="rounded-l-0" v-model="selectedRule.value" 
              :filled="selectedRule.rule.id==null" :label="`Valor${currencyValue}`"></formsFieldsTextComponent>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-3 mt-8">
        <v-row no-gutters class="elevation-2 rounded-lg">
          <v-col class="col-6">
            <v-btn small depressed class="rounded-r-0" color="success" block height="55" @click="addRule()">
              <v-icon v-if="update">mdi-content-save</v-icon>
              <v-icon v-else>mdi-check-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col class="col-6">
            <v-btn small depressed :disabled="!update" class="rounded-l-0" color="red" block height="55"
              @click="removeRule(index)">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-input>

</template>

<script>
  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      value: {
        type: Object,
        default: () => {
          return {
            rule: {
              id: null,
              attributes: {
                name: null,
                type: null,
                value: null
              }
            },
            value: null
          }
        }
      },
      update: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedRule: {
          rule: {
            attributes: {
              type: 'before_to'
            }
          },
          value:null
        },
        items: []
      }
    },
    created() {
      this.getRules()
    },
    mounted() {
      this.selectedRule = this.value
    },
    methods: {
      getRules() {
        this.$axios.get('/rules-reservations').then((response) => {
          this.items = response.data.data
        })
      },
      addRule() {
        this.$emit('input', JSON.parse(JSON.stringify(this.selectedRule)))
      },
      removeRule(index) {
        this.$store.dispatch('zones/removeRule',index)
      }
    },
    computed: {
      currencyValue() {
        switch (this.selectedRule.rule.subtype) {
          case 'days':
            return ' (En dias)'
            break
          case 'months':
            return ' (En meses)'
            break
          case 'hours':
            return ' (En horas)'
            break
          default:
            return ''

        }
      }
    }
  }
</script>

<style>

</style>
