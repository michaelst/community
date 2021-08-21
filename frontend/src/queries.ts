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
    $id: ID!, 
    $accountNumber: String
    $admin: Boolean, 
    $approved: Boolean, 
    $name: String,
  ) {
    updateResident(
      id: $id, 
      input: { 
        accountNumber: $accountNumber
        admin: $admin, 
        approved: $approved, 
        name: $name,
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