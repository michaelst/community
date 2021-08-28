import React from 'react'

import auth from '@react-native-firebase/auth'
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, View } from 'react-native'
import { useColorScheme } from 'react-native'
import Colors from '../../Colors'

async function onAppleButtonPress() {
  // Start the sign-in request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [],
  })

  // Ensure Apple returned a user identityToken
  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned'
  }

  // Create a Firebase credential from the response
  const { identityToken, nonce } = appleAuthRequestResponse
  const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)

  // Sign the user in with the credential
  return auth().signInWithCredential(appleCredential)
}

const Login = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => onAppleButtonPress()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Login