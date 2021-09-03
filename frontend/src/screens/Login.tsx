import React from 'react'
import auth from '@react-native-firebase/auth'
import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { useColorScheme } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons'
import Colors from '../../Colors'
import privateConfig from '../../privateConfig.json'
import useAppStyles from '../utils/useAppStyles'
import { useState } from 'react'
import EmailLogin from './EmailLogin'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

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
  const isDarkMode = useColorScheme() === 'dark'
  const [showEmailInput, setShowEmailInput] = useState(false)

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
        {showEmailInput && <EmailLogin setShowEmailInput={setShowEmailInput} />}
        <LoginButton
          buttonTitle="Sign in with email"
          icon={faEnvelope}
          onPress={() => setShowEmailInput(true)}
        />
        <LoginButton
          buttonTitle="Sign in with Apple"
          icon={faApple}
          onPress={() => onAppleButtonPress()}
        />
        <LoginButton
          buttonTitle="Sign in with Google"
          icon={faGoogle}
          onPress={() => onGoogleButtonPress()}
        />
      </View>
    </SafeAreaView>
  )
}

const LoginButton = ({
  buttonTitle,
  icon,
  ...rest
}: {
  buttonTitle: string
  icon: IconProp
  onPress: () => void
}) => {
  const { styles, baseUnit, fontSize } = useAppStyles()

  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesomeIcon icon={icon} size={fontSize * 0.8} />
        <Text style={{ ...styles.text, color: 'black', marginLeft: baseUnit }}>
          {buttonTitle}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Login
