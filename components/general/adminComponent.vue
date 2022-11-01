<template>
    <div>
      <v-navigation-drawer :value="!mobileMenu" color="primary" app class="navigation-drawer">
        <v-img src="/logo.png" width="100%" contain position="center center" class="mt-3"></v-img>
        <v-list>
          <template v-for="(item, i) in items">
            <v-list-group v-if="item.subItems" :key="i" append-icon="" no-action>
              <template v-slot:activator>
                <v-list-item-content>
                  <v-btn text color="white" block height="50" class="btn-navigation"
                    active-class="btn-navigation-active primary white--text">
                    <v-icon>{{ item.icon }}</v-icon>
                    <span>{{item.title}}</span>
                  </v-btn>
                </v-list-item-content>
              </template>
              <v-list-item class="pl-12" link v-for="(subItem,si) in item.subItems" :key="'s'+si">
                <v-list-item-content>
                  <v-btn text color="secondary" block height="50" class="btn-navigation"
                    active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                    <v-icon>{{ subItem.icon }}</v-icon>
                    <span>{{subItem.title}}</span>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item :key="i+'n'" v-else>
              <v-list-item-content>
                <v-btn text color="white" block height="50" class="btn-navigation"
                  active-class="btn-navigation-active  white--text" :to="item.to">
                  <v-icon>{{ item.icon }}</v-icon>
                  <span>{{item.title}}</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
      <v-bottom-navigation app v-show="mobileMenu" background-color="primary" class="rounded-t-xl">
        <template v-for="(item, i) in bottomItems">
  
          <v-bottom-sheet v-if="item.subItems" :key="i" class="rounded-t-xl">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" icon color="primary" v-on="on">
                <v-icon color="secondary">{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <v-list color="primary">
              <v-list-item v-for="(subItem,i) in item.subItems" :key="i">
                <v-list-item-content>
                  <v-btn color="white" outlined block height="50" class="btn-navigation"
                    active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                    <v-icon>{{ subItem.icon }}</v-icon>
                    <span>{{subItem.title}}</span>
                  </v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-bottom-sheet>
          <template v-else>
            <v-btn :key="i+'n'" color="primary" icon :to="item.to">
              <v-icon color="secondary">{{ item.icon }}</v-icon>
            </v-btn>
          </template>
        </template>
      </v-bottom-navigation>
  
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          mobileMenu: this.$vuetify.breakpoint.name == 'xs',
          clipped: false,
          drawer: false,
          fixed: false,
          items: [{
              icon: 'mdi-apps',
              title: 'Inicio',
              to: '/'
            },
            {
              icon: 'mdi-home',
              title: 'Apartamentos',
              to: '/properties'
            },
            {
              icon: 'mdi-account',
              title: 'Visitas',
              to: '/visits'
            },
            {
              icon: 'mdi-square-rounded',
              title: 'Zonas comunes',
              to: '/zones',
            },
            {
              icon: 'mdi-account-multiple',
              title: 'Staff',
              to: '/staff'
            },
            {
              icon: 'mdi-file',
              title: 'Biblioteca',
              to: '/files'
            },
  
            {
              icon: 'mdi-note-text',
              title: 'Contabilidad',
              to: '/accounting'
            },
            {
              icon: 'mdi-cog',
              title: 'Configuracion',
              to: '/settings'
            }
  
          ],
          bottomItems: [{
              icon: 'mdi-apps',
              title: 'Inicio',
              to: '/'
            },
            {
              icon: 'mdi-home',
              title: 'Apartamentos',
              to: '/properties'
            },
            {
              icon: 'mdi-account',
              title: 'Visitas',
              to: '/visits'
            },
            {
              icon: 'mdi-square-rounded',
              title: 'Zonas comunes',
              subItems: [{
                icon: 'mdi-access-point',
                title: 'Reservas',
                to: '/zones/'
              }, {
                icon: 'mdi-calendar-multiple',
                title: 'Calendario',
                to: '/zones/calendar'
              }]
            },
            {
              icon: 'mdi-dots-horizontal',
              title: 'More',
              subItems: [{
                  icon: 'mdi-note-text',
                  title: 'Contabilidad',
                  to: '/accounting'
                },
                {
                  icon: 'mdi-cog',
                  title: 'Configuracion',
                  to: '/settings'
                },
                {
                  icon: 'mdi-file',
                  title: 'Biblioteca',
                  to: '/files'
                },
  
              ]
            },
          ],
          miniVariant: false,
          right: true,
          rightDrawer: false,
          title: 'Vuetify.js'
        }
      },
      methods: {
        checkTabType(item) {
          if (item.subItems) {
            return 'v-list-group'
          } else {
            return 'v-list-item'
          }
        }
  
      }
    }
  
  </script>
  
  <style>
  
  </style>
  