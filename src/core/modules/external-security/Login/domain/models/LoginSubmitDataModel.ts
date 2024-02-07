// Local interfaces
import {ILoginParamsForm} from "../interfaces/interfaces"

export default class LoginSubmitDataModel {
  email: string;
  password: string;

  constructor (params: ILoginParamsForm) {
    this.email = params.userName
    this.password = params.password
  }
}
