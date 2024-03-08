import process from "process";
import Stripe from 'stripe';

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
if(!process.env.STRIPE_PUBLISHABLE_KEY){
  throw Error('Missing env var STRIPE_PUBLISHABLE_KEY.')
}
const STRIPE_SECRET_KEY =process.env.STRIPE_SECRET_KEY
if(!process.env.STRIPE_SECRET_KEY){
  throw Error('Missing env var STRIPE_SECRET_KEY.')
}
export const stripeServer = new Stripe(STRIPE_SECRET_KEY)
