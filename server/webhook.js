import Stripe from 'stripe';
import express from "express";
import process from "process";
import admin from "firebase-admin";
import {
  getDatabase,
} from "firebase-admin/database";

export const HOST_URL = process.env.HOST_URL
if(!process.env.HOST_URL){
  throw Error('Missing env var HOST_URL.')
}

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
if(!process.env.STRIPE_SECRET_KEY){
  throw Error('Missing env var STRIPE_SECRET_KEY.')
}
const stripe = new Stripe(STRIPE_SECRET_KEY);

const STRIPE_WEBHOOK_SIGNING_SECRET = process.env.STRIPE_WEBHOOK_SIGNING_SECRET
if(!process.env.STRIPE_WEBHOOK_SIGNING_SECRET){
  throw Error('Missing env var STRIPE_WEBHOOK_SIGNING_SECRET.')
}
if(!process.env.STRIPE_CUSTOMER_PORTAL_URL){
  throw Error('Missing env var STRIPE_CUSTOMER_PORTAL_URL.')
}

try {
  JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
}catch (e){
  throw Error(`Exception while parsing JSON FIREBASE_SERVICE_ACCOUNT_KEY: ${e}`)
}
const FIREBASE_SERVICE_ACCOUNT_KEY = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
if(!process.env.FIREBASE_CLIENT_CONFIG){
  throw Error('Missing env var FIREBASE_CLIENT_CONFIG.')
}
const FIREBASE_REALTIME_DATABASE_URL = process.env.FIREBASE_REALTIME_DATABASE_URL
if(!process.env.FIREBASE_REALTIME_DATABASE_URL){
  throw Error('Missing env var FIREBASE_REALTIME_DATABASE_URL.')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEY),
    databaseURL: FIREBASE_REALTIME_DATABASE_URL,
  });
}
const firebaseRealtimeDatabase = getDatabase();
// Use stripe listen --forward-to localhost:3000/webhook/stripe


async function handle__payment_intent__succeeded(event, response) {
  console.log("INSIDE handle__payment_intent__succeeded")
  const session = event.data.object;
  const sourceHostUrl = session.metadata['source_host_url']
  console.log(`sourceHostUrl: ${sourceHostUrl}`)
  if(sourceHostUrl !== HOST_URL) {
    // Source HOST_URL doesn't match this application's HOST_URL.
    // Request came from other environment and should be ignored.
    response.status(200)
    return;
  }
  const firebaseUid = session.metadata['firebase_id']
  console.log(`firebaseUid: ${firebaseUid}`)
  if(!firebaseUid) {
    // Firebase_id cannot be nil, empty string, or whitespace.
    // TODO: Repost to Sentry
    response.status(200)
    return;
  }
  const customerId = session['customer']
  console.log(`customerId: ${customerId}`)
  if(!customerId) {
    // `customer` cannot be null, empty string, or whitespace.
    // TODO: Repost to Sentry
    response.status(200)
    return;
  }

  const refPath = `perksMembership/${firebaseUid}`
  const dbRef = firebaseRealtimeDatabase.ref(refPath)
  await dbRef.set({
    stripeCustomerId: customerId
  });

  // TODO: Ruby CMS had also updated with data from metadata.
  //   email
  //   description: display_name (from Firebase)
  // Email is necessary for Stripe no-code customer portal.
  // We assume that email address will be present on Customer object because they enter email during checkout.
  // When signing in with OAuth providers like Google, Apple, or Facebook, the email address is usually provided by the OAuth provider. However, it's possible for a user to not have an email address if the OAuth provider does not provide this information.
  await stripe.customers.update(
    customerId,
    {
      metadata: {
        firebase_id: firebaseUid,
      },
    }
  );

  response.status(200)
  // TODO: Update RevenueCat?
}
export default function(app){

  app.post('/webhook/stripe', express.raw({type: 'application/json'}), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, STRIPE_WEBHOOK_SIGNING_SECRET);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        await handle__payment_intent__succeeded(event, response)
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    response.send();
  });
}