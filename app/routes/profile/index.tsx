import {Outlet} from "@remix-run/react";
import {useAuth} from "~/services/auth/authContext";
import {isAuthenticatedUser} from "~/services/auth/models/User";

export default function Index() {
  const {isAuthenticated, user} = useAuth()
  if (isAuthenticatedUser(user)) {
    return <div>Authenticated: {user.firebaseUid}</div>
  }
  return (
    <div>
      <h1>Profile Title</h1>
      <Outlet/>
    </div>
  )
}