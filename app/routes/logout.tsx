import {sessionLogout} from "~/services/auth/session.server";
import type {ActionFunction} from "@remix-run/node";

export const action:ActionFunction = async ({ request }) => {
  return await sessionLogout(request);
}