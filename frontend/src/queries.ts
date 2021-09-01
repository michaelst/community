import { gql } from '@apollo/client'

const RESIDENT_FRAGMENT = gql`
  fragment Resident on Resident {
    id
    accountNumber
    admin
    approved
    name
    owner
    unit
  }
`

export const CURRENT_RESIDENT = gql`
  ${RESIDENT_FRAGMENT}
  query CurrentResident {
    currentResident {
      ...Resident
    }
  }
`

export const LIST_RESIDENTS = gql`
  ${RESIDENT_FRAGMENT}
  query ListResidents {
    listResidents(
      sort: [{ field: APPROVED, order: ASC }, { field: NAME, order: ASC }]
    ) {
      ...Resident
    }
  }
`

export const UPDATE_RESIDENT = gql`
  ${RESIDENT_FRAGMENT}
  mutation UpdateResident(
    $id: ID!
    $admin: Boolean
    $approved: Boolean
    $owner: Boolean
  ) {
    updateResident(
      id: $id
      input: { admin: $admin, approved: $approved, owner: $owner }
    ) {
      result {
        ...Resident
      }
    }
  }
`

export const UPDATE_PROFILE = gql`
  ${RESIDENT_FRAGMENT}
  mutation UpdateProfile($accountNumber: String, $name: String, $unit: String) {
    updateProfile(
      input: { accountNumber: $accountNumber, name: $name, unit: $unit }
    ) {
      result {
        ...Resident
      }
    }
  }
`

const ANNOUNCEMENT_FRAGMENT = gql`
  fragment Announcement on Announcement {
    id
    body
    renterViewable
    insertedAt
  }
`

export const LIST_ANNOUNCEMENTS = gql`
  ${ANNOUNCEMENT_FRAGMENT}
  query ListAnnouncements {
    listAnnouncements(sort: [{ field: INSERTED_AT, order: DESC }]) {
      ...Announcement
    }
  }
`

export const CREATE_ANNOUNCEMENT = gql`
  ${ANNOUNCEMENT_FRAGMENT}
  mutation CreateAnnouncement($body: String, $renterViewable: Boolean) {
    createAnnouncement(
      input: { body: $body, renterViewable: $renterViewable }
    ) {
      result {
        ...Announcement
      }
    }
  }
`

export const UPDATE_ANNOUNCEMENT = gql`
  ${ANNOUNCEMENT_FRAGMENT}
  mutation UpdateAnnouncement(
    $id: ID!
    $body: String
    $renterViewable: Boolean
  ) {
    updateAnnouncement(
      id: $id
      input: { body: $body, renterViewable: $renterViewable }
    ) {
      result {
        ...Announcement
      }
    }
  }
`

export const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id) {
      result {
        id
      }
    }
  }
`
