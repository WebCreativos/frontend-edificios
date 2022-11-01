import adminMixin from './admin.js'
import userMixin from './user.js'
export default {
  mixins: [adminMixin, userMixin],
  computed: {
    items() {
      if (this.$route.name.indexOf('accounts')==-1) {
        return this.adminItems
      } else {
        return this.userItems
      }
    },
    bottomItems() {
      if (this.$route.name.indexOf('accounts')==-1) {
        return this.bottomAdminItems
      } else {
        return this.userItems
      }
    }
  }
}
