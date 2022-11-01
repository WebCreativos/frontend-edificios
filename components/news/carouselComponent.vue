<template>
  <div>
    <v-carousel hide-delimiter-background height="220" cycle continuous hide-delimiters :show-arrows="false">
      <v-carousel-item v-for="(nw,index) in news.data" :key="nw.id">
        <GeneralCardComponent height="200" elevation="6" :color="generateColor(index)">
          <GeneralCardTitleComponent class="d-flex justify-space-between fill-width white--text">
            <span>{{nw.title}}</span><span>{{nw.createdAt | formatDate}}</span>
          </GeneralCardTitleComponent>
          <v-divider></v-divider>
          <v-card-text>
            <p class="white--text font-weight-regular">
              {{nw.content}}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="white" class="mb-3 mr-3" @click="()=>{
                openNewsModal = true;
                newInfo=nw
                }" outlined>
              Ver noticia
            </v-btn>
          </v-card-actions>
        </GeneralCardComponent>
      </v-carousel-item>
    </v-carousel>
    <v-dialog v-model="openNewsModal" max-width="600">
      <GeneralCardComponent height="400" class="p-relative">
        <GeneralCardTitleComponent class="d-flex justify-space-between fill-width">
          <span>{{newInfo.title}}</span><span>{{newInfo.createdAt | formatDate}}</span>
        </GeneralCardTitleComponent>
        <v-divider></v-divider>
        <v-card-text class="mt-6">
          <p class="font-weight-regular">
            {{newInfo.content}}
          </p>
        </v-card-text>
        <div class="p-absolute card-actions-dialog fill-width">
            <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="primary" class="mr-3" @click="()=>{
                openNewsModal = false;
                }">
              Cerrar&nbsp;<v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </GeneralCardComponent>
    </v-dialog>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        newInfo: {
          attributes: {}
        },
        openNewsModal: false
      }
    },
    created() {
      this.getNews()
    },
    filters: {
      formatDate(value) {
        return moment(value).format('DD/MM/YYYY')
      }
    },
    methods: {
      getNews() {
        this.$store.dispatch('news/findAll')
      },
      generateColor(index) {
        //generate modern colors with index 
        let colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green',
          'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
        ]
        return colors[index]
      }
    },
    computed: {
      news() {
        return this.$store.getters['news/getList']
      }
    }
  }

</script>
<style scoped>
.card-actions-dialog{
    bottom: 0;
    right: 0;
}
</style>
