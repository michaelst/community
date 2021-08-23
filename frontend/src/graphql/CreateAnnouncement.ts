/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAnnouncement
// ====================================================

export interface CreateAnnouncement_createAnnouncement_result {
  __typename: "Announcement";
  id: string;
  body: string;
  renterViewable: boolean;
  insertedAt: NaiveDateTime;
}

export interface CreateAnnouncement_createAnnouncement {
  __typename: "CreateAnnouncementResult";
  /**
   * The successful result of the mutation
   */
  result: CreateAnnouncement_createAnnouncement_result | null;
}

export interface CreateAnnouncement {
  createAnnouncement: CreateAnnouncement_createAnnouncement | null;
}

export interface CreateAnnouncementVariables {
  body?: string | null;
  renterViewable?: boolean | null;
}
