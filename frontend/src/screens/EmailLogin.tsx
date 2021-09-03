import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { Button, Keyboard, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { TextInput } from 'react-native-gesture-handler'
import privateConfig from '../../privateConfig.json'
import useAppStyles from '../utils/useAppStyles'
import EmailLinkHandler from './EmailLinkHandler'

const EmailLogin = ({
  setShowEmailInput
}: {
  setShowEmailInput: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { styles, colors, baseUnit } = useAppStyles()
  const [email, setEmail] = useState('')
  const [waiting, setWaiting] = useState(false)

  if (waiting) return <EmailLinkHandler />

  return (
    <View style={styles.fullScreenContainer}>
      <TextInput
        style={styles.formInputText}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={{ marginTop: baseUnit }}>
        <Button
          title="Send login link"
          onPress={() => {
            Keyboard.dismiss()
            setWaiting(true)
            sendSignInLink(email)
          }}
        />
      </View>
      <View style={{ marginTop: baseUnit * 5 }}>
        <Button
          title="Cancel"
          color={colors.danger}
          onPress={() => setShowEmailInput(false)}
        />
      </View>
    </View>
  )
}

const BUNDLE_ID = privateConfig.bundleId

const sendSignInLink = async (email: string) => {
  const actionCodeSettings = {
    handleCodeInApp: true,
    url: privateConfig.webUrl,
    iOS: {
      bundleId: BUNDLE_ID
    },
    android: {
      packageName: BUNDLE_ID,
      installApp: true,
      minimumVersion: '12'
    }
  }

  await AsyncStorage.setItem('emailForSignIn', email)

  await auth().sendSignInLinkToEmail(email, actionCodeSettings)
}

export default EmailLogin
