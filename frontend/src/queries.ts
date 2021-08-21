import { gql } from "@apollo/client";

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
`;

export const LIST_RESIDENTS = gql`
  ${RESIDENT_FRAGMENT}
  query ListResidents {
    listResidents(sort: [{ field: APPROVED, order: ASC }, { field: NAME, order: ASC }]) {
      ...Resident
    }
  }
`;

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
      input: { 
        admin: $admin 
        approved: $approved 
        owner: $owner 
      }
    ) {
      result {
        ...Resident
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  ${RESIDENT_FRAGMENT}
  mutation UpdateProfile(
    $accountNumber: String
    $name: String
    $unit: String
  ) {
    updateProfile(
      input: { 
        accountNumber: $accountNumber
        name: $name
        unit: $unit
      }
    ) {
      result {
        ...Resident
      }
    }
  }
`;

export const LIST_ANNOUNCEMENTS = gql`
  query ListAnnouncements {
    listAnnouncements {
      id
      body
    }
  }
`;