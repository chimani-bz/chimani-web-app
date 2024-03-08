export const HOST_URL = process.env.HOST_URL
if(!process.env.HOST_URL){
  throw Error('Missing env var HOST_URL.')
}
