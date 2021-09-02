import React from 'react'
import auth from '@react-native-firebase/auth'
import {
  AppleButton,
  appleAuth
} from '@invertase/react-native-apple-authentication'
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, View } from 'react-native'
import { useColorScheme } from 'react-native'

import Colors from '../../Colors'
import privateConfig from '../../privateConfig.json'
import useAppStyles from '../utils/useAppStyles'

async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: []
  })

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned'
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse
  const appleCredential = auth.AppleAuthProvider.credential(
    identityToken,
    nonce
  )

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential)
}

async function onGoogleButtonPress() {
  GoogleSignin.configure({ webClientId: privateConfig.googleWebClientId })

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

const Login = () => {
  const { baseUnit } = useAppStyles()
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%'
        }}>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          cornerRadius={2}
          style={{
            width: 222,
            height: 40,
            marginBottom: baseUnit * 2
          }}
          onPress={() => onAppleButtonPress()}
        />
        <GoogleSigninButton
          style={{
            width: 230,
            height: 48
          }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onGoogleButtonPress}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login
