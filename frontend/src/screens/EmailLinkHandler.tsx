import React, { useState, useEffect } from 'react'
import { Button, Text, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import auth from '@react-native-firebase/auth'
import { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import useAppStyles from '../utils/useAppStyles'

const EmailLinkHandler = () => {
  const { styles, baseUnit } = useAppStyles()
  const { loading, setLoading } = useEmailLink()
  const [email, setEmail] = useState('')

  const readData = async () => {
    const savedEmail = await AsyncStorage.getItem('emailForSignIn')
    if (savedEmail !== null) setEmail(savedEmail)
  }

  useEffect(() => {
    readData()
  }, [])

  // Show an overlay with a loading indicator while the email link is processed
  if (loading) {
    return (
      <View style={styles.fullScreenContainer}>
        <Text
          style={{
            ...styles.text,
            marginBottom: baseUnit,
            textAlign: 'center'
          }}>
          Sign in link sent to {email}. Check your email for a sign in link.
        </Text>
        <Button title="Cancel" onPress={() => setLoading(false)} />
      </View>
    )
  }

  // Hide otherwise. Or show some content if you are using this as a separate screen
  return null
}

export const useEmailLink = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleDynamicLink = async (
      link: FirebaseDynamicLinksTypes.DynamicLink
    ) => {
      // Check and handle if the link is a email login link
      if (auth().isSignInWithEmailLink(link.url)) {
        try {
          // use the email we saved earlier
          const email = await AsyncStorage.getItem('emailForSignIn')
          if (email) await auth().signInWithEmailLink(email, link.url)
          setLoading(false)

          /* You can now navigate to your initial authenticated screen
            You can also parse the `link.url` and use the `continueurl` param to go to another screen
            The `continueurl` would be the `url` passed to the action code settings */
        } catch (e) {
          null
        }
      }
    }

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink)

    /* When the app is not running and is launched by a magic link the `onLink`
        method won't fire, we can handle the app being launched by a magic link like this */
    dynamicLinks()
      .getInitialLink()
      .then(link => link && handleDynamicLink(link))

    // When the component is unmounted, remove the listener
    return () => unsubscribe()
  }, [])

  return { loading, setLoading }
}

export default EmailLinkHandler
