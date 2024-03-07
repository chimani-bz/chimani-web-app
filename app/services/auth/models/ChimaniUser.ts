import { BaseUser, UserPersona } from "./BaseUser"
import { AuthenticatedUser } from "./AuthenticatedUser"
import { AnonymousUser } from "./AnonymousUser"

export type ChimaniUser = AnonymousUser | AuthenticatedUser

export function isAnonymousUser(user: BaseUser): user is AnonymousUser {
  return user.persona === UserPersona.Anonymous
}

export function isAuthenticatedUser(user: BaseUser): user is AuthenticatedUser {
  return user.persona === UserPersona.Authenticated
}
