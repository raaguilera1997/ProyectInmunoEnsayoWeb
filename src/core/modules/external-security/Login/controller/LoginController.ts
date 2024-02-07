import DefaultResponseModel from "src/domain/models/response/DefaultResponseModel";
import {API_REST_POST_REQUEST} from "src/infrastructure/adapters/BoRestApiAdapter";
const _pathName_="auth"
export async function Auth(params: {
  payload: {};
}) {
  return await API_REST_POST_REQUEST({
    endpoint: `/${_pathName_}`,
    payload: params.payload,
  })
    .then((response:any) => {
      return new DefaultResponseModel(response);
    })
    .catch((error:any) => {
      return new DefaultResponseModel(error.response);
    });
}
