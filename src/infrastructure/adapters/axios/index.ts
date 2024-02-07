import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import config from "src/infrastructure/config/config";
import {notify} from "src/infrastructure/services/VisualNotifyService";
import {Router} from "src/infrastructure/router/index"
let identityApi: AxiosInstance;
let boApi: AxiosInstance;
let boApiUrl = process.env.VUE_CONFIG_API || config.VUE_CONFIG_API;

boApiUrl = boApiUrl.replace(/"/g, "");
boApiUrl = boApiUrl.replace(/\\/g, "");
let identityApiUrl =
  process.env.VUE_CONFIG_API || config.VUE_CONFIG_API;
identityApiUrl = identityApiUrl.replace(/"/g, "");
identityApiUrl = identityApiUrl.replace(/\\/g, "");
// let retry:boolean=false
function errorCallback(error: AxiosError): boolean {
  return true;
}

function isInvalid(response: AxiosResponse) {
  return response.status === 403;
}

const createInstance = (
  api: string,
  interceptor: boolean = true
): AxiosInstance => {
  let apiUrl: string;
  switch (api) {
    case "IDENTITY":
      apiUrl = identityApiUrl;
      break;
    default:
      apiUrl = boApiUrl;
      apiUrl = apiUrl + "/api";
      break;
  }
  //@ts-ignore
  const instance = axios.create({
    baseURL: apiUrl.replace(/"/g, ""),
    timeout: 500000 // request timeout
  });

  if (interceptor) {
    instance.interceptors.request.use(
      (config) => {
        // const token =useLogin().token
        // if (token) {
        //   config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end\
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/identity/Login") {
          // if (err.response) {
          //   // Access Token was expired
          //   if (err.response.status == 401 || err.response.status == 403 && !retry&&useLogin().token) {
          //     retry = true;
          //     try {
          //       const d = await useLogin().refreshTokenAction()
          //       if(d&&d.statusCode == 403){
          //         const d1 = useLogin().signout()
          //       }
          //       return instance(originalConfig);
          //     } catch (_error) {
          //       return Promise.reject(_error);
          //     }
          //   }
          //   if(err.response.status==400&&!is_manage){
          //     notify({
          //       type:'info',
          //       content:err.response.data.errors[0]
          //     })
          //   }
          //   if(err.response.status==502||err.response.status==503){
          //     notify({
          //       type:'info',
          //       content:"offline server please check later"
          //     })
          //   }
          // }
          // else{
          //   notify({
          //     type:'warning',
          //     content:'Please check your internet connection.'
          //   })
          // }
        }
        return Promise.reject(err);
      }
    );
    return instance;
  } else {
    return instance;
  }
};
export default (api: string): AxiosInstance => {
  switch (api) {
    case "IDENTITY":
      if (identityApi !== undefined) {
        return identityApi;
      } else {
        //console.log("recreate identity api");
        identityApi = createInstance(api);
        return identityApi;
      }
    default:
      if (boApi !== undefined) {
        return boApi;
      } else {
        //console.log("recreate bo api");
        boApi = createInstance(api);
        return boApi;
      }
  }
};
