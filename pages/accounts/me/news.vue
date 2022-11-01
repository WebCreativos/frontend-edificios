<template>
    <v-container>
        <HeadersGeneralComponent>
            <template v-slot:title>
                Novedades
            </template>
        </HeadersGeneralComponent>
        <v-row>
            <v-col class="col-12" v-for="nw in news.data" :key="nw.id">
                <GeneralCardComponent>
                    <GeneralCardTitleComponent class="d-flex justify-space-between"> 
                        <span>{{nw.title}}</span>
                        <v-chip>
                            {{nw.createdAt | date}}
                        </v-chip>
                    </GeneralCardTitleComponent>
                    <v-divider></v-divider>
                    <v-card-text>
                        <p class="font-weight-regular black--text text-subtitle-1">{{nw.content}}</p>
                    </v-card-text>
                </GeneralCardComponent>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from 'moment'
export default {
    filters:{
        date(value){
            return moment(value).format('DD/MM/YYYY')
        }
    },
    created() {
        this.getNews()
    },  
    methods:{
        getNews() {
            this.$store.dispatch('news/findAll')
        }
    },
    computed:{
        news() {
            return this.$store.getters['news/getList']
        }
    }
}
</script>