import React from 'react'
import firebase from 'firebase/app'

const Login = () => {
  return (
    <button
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}
      >
        Sign in with Google
      </button>
  )
}

export default Login