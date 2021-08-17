import { gql } from "@apollo/client";

export const CURRENT_RESIDENT = gql`
  query CurrentResident {
    currentResident {
      id
      approved
      admin
    }
  }
`;

export const LIST_RESIDENTS = gql`
  query ListResidents {
    listResidents {
      id
      admin
      approved
      owner
      unit
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