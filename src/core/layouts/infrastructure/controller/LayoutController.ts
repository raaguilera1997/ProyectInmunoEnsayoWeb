// // Adapters
// import {
//   API_REST_POST_REQUEST
// } from "src/infrastructure/adapters/BoRestApiAdapter";
//
// import { API_REST_GET_REQUEST } from "src/infrastructure/adapters/BoRestApiAdapter";
// import DefaultResponseModel from "src/domain/models/response/DefaultResponseModel";
// import DefaultErrorResponseWithOutControl from "src/domain/errors/DefaultErrorResponseWithOutControl";
// // Global Store
// import {
//   setUserData,
//   getUserData,
//   getUserStatus
// } from "src/infrastructure/store/security/UserDataStore";
//
// export function GetUserDataFromServer() {
//   return API_REST_GET_REQUEST({
//     endpoint: "/Auth/GetUserInfo"
//   })
//     .then(response => {
//       if (response.data.statusCode == 200) {
//         setUserData({
//           userData: response.data.globalUser,
//           boProfile: response.data.boUser.boProfile,
//           needWizard: response.data.needWizard
//         });
//         // @ts-ignore
//         if(window.$chatwoot != undefined){
//         // @ts-ignore
//           window.$chatwoot.setUser(response.data.globalUser.id, {
//             // @ts-ignore
//             email: response.data.globalUser.email,
//             // @ts-ignore
//             name: response.data.globalUser.userName,
//             // @ts-ignore
//             phone_number: response.data.globalUser.phoneNumber,
//           });
//           // @ts-ignore
//           window.$chatwoot.setCustomAttributes({
//             // @ts-ignore
//             company: this.$VUE_CONFIG_BO_APP_KEY,
//           });
//         }
//
//         return getUserData();
//       } else
//         return new DefaultErrorResponseWithOutControl({
//           message: response.data.errors
//         });
//     })
//     .catch(error => {
//       //console.log("entro al catch", error.response);
//       // The server response with error response but the response code was not correct
//       return new DefaultErrorResponseWithOutControl({
//         message: error.response.data.errors
//       });
//     });
// }
//
// export async function GetUserData() {
//   if (getUserStatus()) return getUserData();
//   return await GetUserDataFromServer();
// }
//
// export function BeginResetPassword(params: { email: string; appCode: string }) {
//   return API_REST_POST_REQUEST({
//     endpoint: "/identity/BeginResetPassword",
//     payload: params
//   })
//     .then(response => {
//       if (response.status == 200) return new DefaultResponseModel(response);
//       // The server response with ok response but the response code was not correct
//       return new DefaultErrorResponseWithOutControl(response.data.response.data);
//     })
//     .catch(error => {
//       // The server response with error response but the response code was not correct
//       return new DefaultErrorResponseWithOutControl({
//         message: error.response.data.errors
//       });
//     });
// }
//
// export function ResetPassword(params: {
//   userId: string;
//   newPassword: string;
//   confirmedPassword: string;
// }) {
//   return API_REST_POST_REQUEST({
//     endpoint: "/identity/ResetPassword",
//     payload: params
//   })
//     .then(response => {
//       if (response.status == 200) return response.status;
//       // The server response with ok response but the response code was not correct
//       return new DefaultErrorResponseWithOutControl(response.data.response.data);
//     })
//     .catch(error => {
//       // The server response with error response but the response code was not correct
//       return new DefaultErrorResponseWithOutControl({
//         message: error.response.data.errors
//       });
//     });
// }
