import firebase from 'firebase/app'

const getFirebaseUser = () => {
  return firebase.auth().currentUser
}

export default getFirebaseUser