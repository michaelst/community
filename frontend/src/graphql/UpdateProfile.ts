/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateProfile
// ====================================================

export interface UpdateProfile_updateProfile_result {
  __typename: "Resident";
  id: string;
  accountNumber: string | null;
  admin: boolean;
  approved: boolean;
  name: string | null;
  owner: boolean;
  unit: string | null;
}

export interface UpdateProfile_updateProfile {
  __typename: "UpdateProfileResult";
  /**
   * The successful result of the mutation
   */
  result: UpdateProfile_updateProfile_result | null;
}

export interface UpdateProfile {
  updateProfile: UpdateProfile_updateProfile | null;
}

export interface UpdateProfileVariables {
  accountNumber?: string | null;
  name?: string | null;
  unit?: string | null;
}
