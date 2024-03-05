import {UserPersona} from "./BaseUser"

export type AnonymousUser = {
  persona: UserPersona.Anonymous
}

export const AnonymousUserInstance: AnonymousUser = {
  persona: UserPersona.Anonymous,
}
