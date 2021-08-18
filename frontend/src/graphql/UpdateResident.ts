/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateResident
// ====================================================

export interface UpdateResident_updateResident_result {
  __typename: "Resident";
  id: string;
  accountNumber: string | null;
  admin: boolean;
  approved: boolean;
  name: string | null;
  owner: boolean;
  unit: string | null;
}

export interface UpdateResident_updateResident {
  __typename: "UpdateResidentResult";
  /**
   * The successful result of the mutation
   */
  result: UpdateResident_updateResident_result | null;
}

export interface UpdateResident {
  updateResident: UpdateResident_updateResident | null;
}

export interface UpdateResidentVariables {
  id: string;
  approved?: boolean | null;
  admin?: boolean | null;
}
