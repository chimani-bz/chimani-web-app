import process from "process";

const REVENUE_CAT_API_V1_KEY = process.env.REVENUE_CAT_API_V1_KEY
if(!process.env.REVENUE_CAT_API_V1_KEY){
  throw Error('Missing env var REVENUE_CAT_API_V1_KEY.')
}
const REVENUE_CAT_IS_SANDBOX = process.env.REVENUE_CAT_IS_SANDBOX?.toLowerCase() === 'true'

export async function hasUserPerksEntitlement(firebaseUid: string){
  if(!firebaseUid) {
    return false
  }
  // Even thought this is GET request, RevenueCat will create user if it does not exists.
  // At the time of writing, Customer is only accessible via V1 API.
  // From Docs:
  // `Gets the latest Customer Info for the customer with the given App User ID, or creates a new customer if it doesn't exist.`
  // Docs:
  // https://www.revenuecat.com/docs/api-v1#tag/customers/operation/subscribers
  try {
    const apiResponse = await fetch(
      `https://api.revenuecat.com/v1/subscribers/${firebaseUid}`,
      {
        headers: {
          'Authorization': `Bearer ${REVENUE_CAT_API_V1_KEY}`,
          'X-Is-Sandbox': `${REVENUE_CAT_IS_SANDBOX}`,
        }
      }
    )
    const payload = await apiResponse.json()
    const entitlements = payload['subscriber']['entitlements']
    // TODO: What about users that do not have `perks` but have some other product.
    // Example: https://app.revenuecat.com/customers/00485698/hXjSD6VrNWW7uqFf4H7A1aagS3H2
    if(entitlements.perks){
      // TODO: Check if it is necessary to check expiration date. It seems that entitlements persist after they expiration.
      const expiresDateString = entitlements.perks.expires_date
      const expiresDate = new Date(expiresDateString)
      const isStillActive = new Date() <= expiresDate
      return isStillActive
    }
    return false
  } catch (e){
    // TODO: Log to Sentry.
    return false
  }
}