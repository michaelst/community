import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form } from 'react-bootstrap'

import { UPDATE_PROFILE } from '../queries'
import { CurrentResident_currentResident } from '../graphql/CurrentResident'

type ProfileProps = {
  resident: CurrentResident_currentResident
  onSave?: () => void
}

const Profile = ({ resident, onSave }: ProfileProps) => {
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
    updateProfile().then(() => onSave && onSave())
  }

  return (
    <Form autoComplete="off">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name ?? ''}
          onChange={(event: FormEvent) => setName(event.target.value)}
          placeholder="Name"
          autoComplete="off"
        />

        <Form.Label className="mt-3">Unit #</Form.Label>
        <Form.Control
          type="text"
          value={unit ?? ''}
          onChange={(event: FormEvent) => setUnit(event.target.value)}
          placeholder="Unit"
          autoComplete="off"
        />

        <Form.Label className="mt-3">
          FCS Account Number
          <br />
          <small className="text-muted">
            You can find your account number on the billing page of the{' '}
            <a
              href="https://portal.hoaliving.com/Homeowner_v2/Billing"
              target="_blank">
              FCS Portal
            </a>
            .
          </small>
        </Form.Label>
        <Form.Control
          type="text"
          value={accountNumber ?? ''}
          onChange={(event: FormEvent) => setAccountNumber(event.target.value)}
          placeholder="FCS Account Number (type 'renter' if non-owner)"
          autoComplete="off"
        />
      </Form.Group>

      <div className="d-grid">
        <Button
          variant="outline-primary"
          onClick={() => save()}
          className="mt-3">
          Save
        </Button>
      </div>
    </Form>
  )
}

export default Profile
