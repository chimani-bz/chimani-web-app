import {sessionLogout} from "~/fb.sessions.server";

export async function action({ request }) {
  return await sessionLogout(request);
}