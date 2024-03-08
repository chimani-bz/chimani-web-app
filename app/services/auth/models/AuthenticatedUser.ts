import {BaseUser, UserPersona} from "./BaseUser"

export type AuthenticatedUserData = {
  firebaseUid: string
  email: string
  displayName: string
  hasActiveSubscription: boolean
  stripeCustomerId: string | null
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
