export default function ({  $auth, redirect }) {
    // If the user is not authenticated
    console.log($auth)
    if (!$auth.user.loggedIn) {
      return redirect('/accounts/login')
    } else {
        if ($auth.user.type == 'owner' || $auth.user.type == 'tenant') {
            return redirect('/accounts/dashboard')
        } else {
            return redirect('/')
        }
    }
  }
  
  