<template>
    <v-container>
        <HeadersGeneralComponent>
            <template v-slot:title>
                Visitas
            </template>
        </HeadersGeneralComponent>
        <v-row>
            <v-col class="col-12">
                <PropertiesVisitsComponent elevation="6" :items="items" @update="getVisits()"></PropertiesVisitsComponent>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                items:{}
            }
        },
        created() {
        },
        methods:{
        }
    }
</script>
