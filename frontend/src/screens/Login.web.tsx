import React from 'react'
import { useAuth } from 'reactfire'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

const Login = () => {
  const auth = useAuth

  const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [
      {
        provider: auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        requireDisplayName: true
      },
      auth.GoogleAuthProvider.PROVIDER_ID,
      'apple.com'
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
}

export default Login
