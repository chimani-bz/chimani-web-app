import {json, Outlet} from "@remix-run/react";
import {useLoaderData} from "react-router";
import {getFirebaseIdTokenFromRemixSession, isSessionValid} from "~/services/auth/session.server";

export async function loader({ request }) {
  const { decodedClaims, error } = await isSessionValid(request, "/login");
  const userProfile = await (async () => {
    console.log('INSIDE userProfile')
    if(error){
      return null
    }
    const idToken = await getFirebaseIdTokenFromRemixSession(request);
    const result = await fetch(
      "http://127.0.0.1:8000/api/web/me", {
        headers: {
          'Authorization': `Basic ${idToken}`,
        }
      }
    )
    .then(res => res.json())
    console.log('result')
    console.log(result)
    return result
  })()
  console.log('TEST')
  console.log(userProfile)

  const data = {
    error,
    decodedClaims,
    userProfile,
  };
  return json(data);
}

export default function Index() {
  const data = useLoaderData();
  return (
    <div className="ui segment">
      <div className="ui medium header">User Authentication Information</div>
      <p>Name: {data?.decodedClaims?.name || "** Name Missing **"}</p>
      <p>Email: {data?.decodedClaims?.email}</p>
      <p>Login Using: {data?.decodedClaims?.firebase?.sign_in_provider}</p>
      {data?.userProfile &&
        <div>
          {data?.userProfile?.subscriptionName}
        </div>
      }
    </div>
  )
  return (
    <div>
      <h1>Profile Title</h1>
      <Outlet/>
    </div>
  )
}