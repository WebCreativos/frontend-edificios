export default {
    data() {
        return {
            userItems: [{
              icon: 'mdi-apps',
              title: 'Inicio',
              to: '/accounts/me'
            },
            {
              icon: 'mdi-logout',
              title: 'Salir',
              to: '/accounts/logout'
            },
          ]
        }
    }
}