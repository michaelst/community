import React, { Dispatch, SetStateAction } from 'react'
import { FlatList } from 'react-native'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { useColorScheme } from 'react-native'
import EllipsisDropDownToggle from '../components/EllipsisDropDownToggle'

import { ListAnnouncements, ListAnnouncements_listAnnouncements } from '../graphql/ListAnnouncements'
import { CREATE_ANNOUNCEMENT, CURRENT_RESIDENT, DELETE_ANNOUNCEMENT, LIST_ANNOUNCEMENTS, UPDATE_ANNOUNCEMENT } from '../queries'
import { CurrentResident } from '../graphql/CurrentResident'
import { useState } from 'react'

const Announcements = () => {
  const { data } = useQuery<ListAnnouncements>(LIST_ANNOUNCEMENTS)
  const { data: currentResident } = useQuery<CurrentResident>(CURRENT_RESIDENT)
  const isAdmin = currentResident?.currentResident.admin ?? false

  return (
    <Row className="justify-content-md-center p-5">
      <Col xs lg="6">
        {isAdmin ? <CreateAnnouncementCard /> : null}
        <FlatList
          data={data?.listAnnouncements}
          renderItem={props => <Announcement isAdmin={isAdmin} {...props} />}
          keyExtractor={item => item.id}
        />
      </Col>
    </Row>
  )
}

type AnnouncementProps = {
  item: ListAnnouncements_listAnnouncements
  isAdmin: boolean
}

const Announcement = ({ item, isAdmin }: AnnouncementProps) => {
  const colorScheme = useColorScheme() ?? "light"
  const isDarkMode = useColorScheme() === 'dark'
  const [edit, setEdit] = useState(false)

  return (
    <Card
      className="mb-5"
      bg={colorScheme}
      text={isDarkMode ? "white" : "dark"}
    >
      <Card.Header className="text-muted small d-flex justify-content-between align-items-center">
        {item.insertedAt.toRelative()}

        {isAdmin
          ? <AdminActions announcement={item} setEdit={setEdit} />
          : null}
      </Card.Header>
      <Card.Body>
        {edit
          ? <UpdateAnnouncementForm announcement={item} onSave={() => setEdit(false)} />
          : (
            <>
              {item.body.split('\n').map((str, i) => <p key={i}>{str}</p>)}

              {isAdmin ?
                <div className="mt-2 text-muted small">
                  Visible to {item.renterViewable ? "all residents" : "owners"}
                </div>
                : null}
            </>
          )
        }
      </Card.Body>
    </Card>
  )
}

type AdminActionsProps = {
  announcement: ListAnnouncements_listAnnouncements
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
}


const AdminActions = ({ announcement, setEdit }: AdminActionsProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT, {
    variables: { id: announcement.id },
    update(cache) {
      cache.evict({ id: 'Announcement:' + announcement.id })
      cache.gc()
    }
  })

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle as={EllipsisDropDownToggle} />

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setEdit(true)}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteModal(true)}>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton />
        <Modal.Body>Are you sure you want to delete this announcement?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
            deleteAnnouncement()
            setShowDeleteModal(false)
          }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const CreateAnnouncementCard = () => {
  const colorScheme = useColorScheme() ?? "light"
  const isDarkMode = useColorScheme() === 'dark'
  const bodyState = useState("")
  const [body, setBody] = bodyState
  const renterViewableState = useState(true)
  const [renterViewable, setRenterViewable] = renterViewableState

  const [createAnnouncement] = useMutation(CREATE_ANNOUNCEMENT, {
    variables: {
      body: body,
      renterViewable: renterViewable
    },
    update(cache, { data: { createAnnouncement } }) {
      const data = cache.readQuery<ListAnnouncements | null>({ query: LIST_ANNOUNCEMENTS })

      cache.writeQuery({
        query: LIST_ANNOUNCEMENTS,
        data: { listAnnouncements: [createAnnouncement.result].concat(data?.listAnnouncements) }
      })
    }
  })

  return (
    <Card
      className="mb-5"
      bg={colorScheme}
      text={isDarkMode ? "white" : "dark"}
    >
      <Card.Header>New Announcement</Card.Header>
      <Card.Body>
        <AnnouncementForm
          actionVerb="Post"
          bodyState={bodyState}
          renterViewableState={renterViewableState}
          onSave={() => {
            createAnnouncement()
            setBody("")
            setRenterViewable(true)
          }} />
      </Card.Body>
    </Card>
  )
}

type UpdateAnnouncementFormProps = {
  announcement: ListAnnouncements_listAnnouncements
  onSave: () => void
}

const UpdateAnnouncementForm = ({ announcement, onSave }: UpdateAnnouncementFormProps) => {
  const bodyState = useState(announcement.body)
  const [body] = bodyState
  const renterViewableState = useState(announcement.renterViewable)
  const [renterViewable] = renterViewableState

  const [updateAnnouncement] = useMutation(UPDATE_ANNOUNCEMENT, {
    variables: {
      id: announcement.id,
      body: body,
      renterViewable: renterViewable
    }
  })

  return <AnnouncementForm
    actionVerb="Update"
    bodyState={bodyState}
    renterViewableState={renterViewableState}
    onSave={() => {
      updateAnnouncement()
      onSave()
    }} />
}

type AnnouncementFormProps = {
  actionVerb: string
  bodyState: [string, Dispatch<SetStateAction<string>>]
  onSave: () => void
  renterViewableState: [boolean, Dispatch<SetStateAction<boolean>>]
}

const AnnouncementForm = ({ actionVerb, bodyState, renterViewableState, onSave }: AnnouncementFormProps) => {
  const [body, setBody] = bodyState
  const [renterViewable, setRenterViewable] = renterViewableState

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={4}
          value={body}
          onChange={(event: FormEvent) => setBody(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Visible to all residents?"
          checked={renterViewable}
          onChange={() => setRenterViewable(!renterViewable)}
        />
      </Form.Group>

      <div className="d-grid">
        <Button
          variant="outline-primary"
          onClick={() => onSave()}
          className="mt-3"
        >
          {actionVerb}
        </Button>
      </div>
    </Form>
  )
}

export default Announcements