import { gql } from "@apollo/client";

export const LIST_ANNOUNCEMENTS = gql`
  query ListAnnouncements {
    listAnnouncements {
      id
      body
    }
  }
`;