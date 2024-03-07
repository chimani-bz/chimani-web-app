import {BaseUser, UserPersona} from "./BaseUser"

export type AuthenticatedUserData = {
  firebaseUid: string
  hasActiveSubscription: boolean
}
export type AuthenticatedUser = BaseUser &
  AuthenticatedUserData & {
    persona: UserPersona.Authenticated
  }

export function createAuthenticatedUser(
  params: AuthenticatedUserData,
): AuthenticatedUser {
  return {
    ...params,
    persona: UserPersona.Authenticated,
  }
}
