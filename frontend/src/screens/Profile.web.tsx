import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Form } from 'react-bootstrap'

import { CURRENT_RESIDENT, UPDATE_PROFILE } from '../queries'
import { CurrentResident } from '../graphql/CurrentResident'

type ProfileProps = {
  onSave?: () => void
}

const Profile = ({ onSave }: ProfileProps) => {
  const [name, setName] = useState<string | null>()
  const [unit, setUnit] = useState<string | null>()
  const [accountNumber, setAccountNumber] = useState<string | null>()

  useQuery<CurrentResident>(CURRENT_RESIDENT, {
    onCompleted: data => {
      setName(data.currentResident.name)
      setUnit(data.currentResident.unit)
      setAccountNumber(data.currentResident.accountNumber)
    }
  })

  const [updateProfile] = useMutation(UPDATE_PROFILE, {
    variables: {
      name: name,
      unit: unit,
      accountNumber: accountNumber
    }
  })

  const save = () => {
    updateProfile().then(() => onSave && onSave())
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name ?? ""}
          onChange={(event: FormEvent) => setName(event.target.value)}
          placeholder="Name"
        />

        <Form.Label className="mt-3">Unit #</Form.Label>
        <Form.Control
          type="text"
          value={unit ?? ""}
          onChange={(event: FormEvent) => setUnit(event.target.value)}
          placeholder="Name"
        />

        <Form.Label className="mt-3">FCS Account Number</Form.Label>
        <Form.Control
          type="text"
          value={accountNumber ?? ""}
          onChange={(event: FormEvent) => setAccountNumber(event.target.value)}
          placeholder="FCS Account Number"
        />
      </Form.Group>

      <div className="d-grid">
        <Button
          variant="outline-primary"
          onClick={() => save()}
          className="mt-3"
        >
          Save
        </Button>
      </div>
    </Form>
  )
}

export default Profile