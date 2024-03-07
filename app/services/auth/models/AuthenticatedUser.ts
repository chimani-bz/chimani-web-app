import {BaseUser, UserPersona} from "./BaseUser"

export type AuthenticatedUserData = {
  firebase_uid: string
  has_active_subscription: boolean
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
