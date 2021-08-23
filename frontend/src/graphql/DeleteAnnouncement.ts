/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteAnnouncement
// ====================================================

export interface DeleteAnnouncement_deleteAnnouncement_result {
  __typename: "Announcement";
  id: string;
}

export interface DeleteAnnouncement_deleteAnnouncement {
  __typename: "DeleteAnnouncementResult";
  /**
   * The record that was successfully deleted
   */
  result: DeleteAnnouncement_deleteAnnouncement_result | null;
}

export interface DeleteAnnouncement {
  deleteAnnouncement: DeleteAnnouncement_deleteAnnouncement | null;
}

export interface DeleteAnnouncementVariables {
  id: string;
}
