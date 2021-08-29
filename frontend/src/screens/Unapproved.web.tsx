import React, { Dispatch, SetStateAction, useState } from 'react'
import { useColorScheme } from 'react-native'
import Container from 'react-bootstrap/Container'
import { Alert, Button, Col, Row } from 'react-bootstrap'

import Colors from '../../Colors'
import Profile from './Profile.web'
import { CurrentResident_currentResident } from '../graphql/CurrentResident'

type Props = {
  resident: CurrentResident_currentResident
}

const Unapproved = ({ resident }: Props) => {
  const isDarkMode = useColorScheme() === 'dark'
  const [edit, setEdit] = useState(resident.name === null)

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      color: isDarkMode ? Colors.white : Colors.black
    }}>
      <Container className="p-5">
        <Row className="justify-content-md-center">
          <Col xs lg="6">
            {resident.approved ?
              null :
              <Alert variant="warning">
                Fill out your information below and click save.
                An admin will need to review your information and approve you.
              </Alert>
            }
            {edit
              ? <Profile resident={resident} onSave={() => setEdit(false)} />
              : <ViewOnlyProfile resident={resident} setEdit={setEdit} />}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

type ViewOnlyProfileProps = {
  resident: CurrentResident_currentResident
  setEdit: Dispatch<SetStateAction<boolean>>
}

const ViewOnlyProfile = ({ resident, setEdit }: ViewOnlyProfileProps) => {
  return (
    <div>
      <h6>Name</h6>
      <p>{resident.name}</p>

      <h6>Unit #</h6>
      <p>{resident.unit}</p>

      <h6>FCS Account Number</h6>
      <p>{resident.accountNumber}</p>

      <div className="d-grid">
        <Button
          variant="outline-primary"
          onClick={() => setEdit(true)}
        >
          Edit
        </Button>
      </div>
    </div>
  )
}

export default Unapproved
