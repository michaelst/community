/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateAnnouncement
// ====================================================

export interface UpdateAnnouncement_updateAnnouncement_result {
  __typename: "Announcement";
  id: string;
  body: string;
  renterViewable: boolean;
  insertedAt: NaiveDateTime;
}

export interface UpdateAnnouncement_updateAnnouncement {
  __typename: "UpdateAnnouncementResult";
  /**
   * The successful result of the mutation
   */
  result: UpdateAnnouncement_updateAnnouncement_result | null;
}

export interface UpdateAnnouncement {
  updateAnnouncement: UpdateAnnouncement_updateAnnouncement | null;
}

export interface UpdateAnnouncementVariables {
  id: string;
  body?: string | null;
  renterViewable?: boolean | null;
}
