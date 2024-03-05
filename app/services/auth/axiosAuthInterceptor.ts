// import {InternalAxiosRequestConfig} from 'axios'
// import {AuthStateStorage} from "./authStateStorage";
//
// export function addAuthenticationToAxiosRequestInterceptor(
//   request: InternalAxiosRequestConfig<any>
// ) {
//   const authState = AuthStateStorage.load();
//   console.log('INSIDE addAuthenticationToAxiosRequestInterceptor')
//   console.log('authStorage:')
//   console.log(authState)
//   if(authState){
//     request.headers = request.headers ?? {};
//     request.headers['Authorization'] = `Bearer ${authState.authToken}`;
//   }
//   return request
// }
