export default {
    data() {
        return {
            adminItems: [{
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
                icon: 'ion-ios-hand',
                title: 'Novedades',
                to: '/news'
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
              },
              {
                icon: 'mdi-logout',
                title: 'Salir',
                to: '/accounts/logout'
              },  
    
            ],
            bottomAdminItems: [{
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
                  {
                    icon: 'mdi-logout',
                    title: 'Salir',
                    to: '/accounts/logout'
                  },
      
                ]
              },
            ],
        }
    }
}