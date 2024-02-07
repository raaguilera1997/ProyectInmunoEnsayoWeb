import { AxiosResponse } from "axios";

import axiosDefault from "src/infrastructure/adapters/axios";

function API_REST_GET_REQUEST(params: { endpoint: string }, config?: any) {
  return axiosDefault("Test")
    .get(params.endpoint, config)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}

function API_REST_POST_REQUEST(params: { endpoint: string; payload: object }) {
  return axiosDefault("Test")
    .post(params.endpoint, params.payload)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}

function API_REST_PUT_REQUEST(params: { endpoint: string; payload?: object }) {
  return axiosDefault("Test")
    .put(params.endpoint, params.payload)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}

function API_REST_DELETE_REQUEST(params: {
  endpoint: string;
  payload: object;
}) {
  return axiosDefault("Test")
    //@ts-ignore
    .delete(params.endpoint, params.payload)
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch((error:any) => {
      throw error;
    });
}

export {
  API_REST_GET_REQUEST,
  API_REST_POST_REQUEST,
  API_REST_PUT_REQUEST,
  API_REST_DELETE_REQUEST
};
