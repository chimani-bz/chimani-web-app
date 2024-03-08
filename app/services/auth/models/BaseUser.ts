export enum UserPersona {
  Anonymous = "anonymous",
  Authenticated = "authenticated"
}

export type BaseUser = {
  persona: UserPersona
}
