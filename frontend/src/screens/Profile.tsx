import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Form } from 'react-bootstrap'

import { CURRENT_RESIDENT, UPDATE_RESIDENT } from '../queries'
import { CurrentResident } from '../graphql/CurrentResident'

type ProfileProps = {
  onSave?: () => void
}

type Event = React.ChangeEvent<HTMLInputElement>

const Profile = ({ onSave }: ProfileProps) => {
  const [id, setId] = useState("")
  const [name, setName] = useState<string | null>()
  const [unit, setUnit] = useState<string | null>()
  const [accountNumber, setAccountNumber] = useState<string | null>()

  useQuery<CurrentResident>(CURRENT_RESIDENT, {
    onCompleted: data => {
      setId(data.currentResident.id)
      setName(data.currentResident.name)
      setUnit(data.currentResident.unit)
      setAccountNumber(data.currentResident.accountNumber)
    }
  })

  const [updateResident] = useMutation(UPDATE_RESIDENT, {
    variables: {
      id: id,
      name: name,
      unit: unit,
      accountNumber: accountNumber
    }
  })

  const save = () => {
    updateResident().then(() => onSave && onSave())
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name ?? ""}
          onChange={(event: Event) => setName(event.target.value)}
          placeholder="Name"
        />

        <Form.Label className="mt-3">Unit #</Form.Label>
        <Form.Control
          type="text"
          value={unit ?? ""}
          onChange={(event: Event) => setUnit(event.target.value)}
          placeholder="Name"
        />

        <Form.Label className="mt-3">FCS Account Number</Form.Label>
        <Form.Control
          type="text"
          value={accountNumber ?? ""}
          onChange={(event: Event) => setAccountNumber(event.target.value)}
          placeholder="FCS Account Number"
        />
      </Form.Group>

      <Button
        variant="outline-secondary"
        onClick={() => save()}
        className="mt-3"
      >
        Save
      </Button>
    </Form>
  )
}

export default Profile