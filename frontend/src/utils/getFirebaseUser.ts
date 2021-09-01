import auth from '@react-native-firebase/auth'

const getFirebaseUser = () => {
  return auth().currentUser
}

export default getFirebaseUser
