/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentResident
// ====================================================

export interface CurrentResident_currentResident {
  __typename: "Resident";
  id: string;
  accountNumber: string | null;
  admin: boolean;
  approved: boolean;
  name: string | null;
  owner: boolean;
  unit: string | null;
}

export interface CurrentResident {
  currentResident: CurrentResident_currentResident;
}
