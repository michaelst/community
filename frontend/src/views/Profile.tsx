import React, { SetStateAction } from 'react'
import { useMutation } from '@apollo/client'
import { Dispatch } from 'react'
import { useState } from 'react'
import { Button } from 'react-native'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { CurrentResident_currentResident } from '../graphql/CurrentResident'
import { UPDATE_PROFILE } from '../queries'
import useAppStyles from '../utils/useAppStyles'

type Props = {
  resident: CurrentResident_currentResident
}

const Profile = ({ resident }: Props) => {
  const [edit, setEdit] = useState(resident.name === null)

  if (edit) return <EditProfile resident={resident} setEdit={setEdit} />

  return <ViewProfile resident={resident} setEdit={setEdit} />
}

type ProfileProps = {
  resident: CurrentResident_currentResident
  setEdit: Dispatch<SetStateAction<boolean>>
}

const ViewProfile = ({ resident, setEdit }: ProfileProps) => {
  const { styles, baseUnit } = useAppStyles()

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeaderText}>
            Fill out your information below and click save. An admin will need
            to review your information and approve you.
          </Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Name</Text>
            <Text style={styles.text}>{resident.name}</Text>
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Unit #</Text>
            <Text style={styles.text}>{resident.unit}</Text>
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>FCS Account Number</Text>
            <Text style={styles.text}>{resident.accountNumber}</Text>
          </View>
        </View>
      </View>

      <Button title="Edit" onPress={() => setEdit(true)} />
    </>
  )
}

const EditProfile = ({ resident, setEdit }: ProfileProps) => {
  const { styles, baseUnit } = useAppStyles()

  const [name, setName] = useState(resident.name)
  const [unit, setUnit] = useState(resident.unit)
  const [accountNumber, setAccountNumber] = useState(resident.accountNumber)

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      name: name,
      unit: unit,
      accountNumber: accountNumber
    }
  })

  const save = () => {
    updateProfile().then(() => setEdit(false))
  }

  return (
    <>
      <View style={styles.card}>
        <View style={styles.cardHeaderContainer}>
          <Text style={styles.cardHeaderText}>
            Fill out your information below and click save. An admin will need
            to review your information and approve you.
          </Text>
        </View>
        <View style={styles.cardBodyContainer}>
          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Name</Text>
            <TextInput
              style={styles.formInputText}
              onChangeText={setName}
              value={name || ''}
            />
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>Unit #</Text>
            <TextInput
              style={styles.formInputText}
              onChangeText={setUnit}
              value={unit || ''}
            />
          </View>

          <View style={{ marginBottom: baseUnit * 2 }}>
            <Text style={styles.headerTitleText}>FCS Account Number</Text>
            <TextInput
              style={styles.formInputText}
              onChangeText={setAccountNumber}
              value={accountNumber || ''}
            />
          </View>
        </View>
      </View>

      <Button title="Save" onPress={save} />
    </>
  )
}

export default Profile
