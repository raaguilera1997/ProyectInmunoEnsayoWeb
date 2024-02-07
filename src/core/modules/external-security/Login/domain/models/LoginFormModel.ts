import { required, email } from "src/infrastructure/statics/InputsRulesValidation"
import {IDefaultInput} from "src/core/interfaces/interfaces"
import {IPasswordInput} from "src/core/interfaces/interfaces"

export default class LoginFormModel {
  userName: IDefaultInput;
  password: IPasswordInput;

  constructor () {
    this.userName = {
      label: "Usuario *",
      maxLength: 255,
      value: "",
      icon: "person",
      rules: [required,]
    }
    this.password = {
      label: "Contraseña *",
      maxLength: 255,
      value: "",
      icon: "lock",
      show: false,
      rules: [required]
    }
  }

  CleanFormInputsValue () {
    this.userName.value = ""
    this.password.value = ""
  }
}
