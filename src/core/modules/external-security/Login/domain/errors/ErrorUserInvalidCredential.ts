export default class ErrorUserInvalidCredential {
  code: number;
  message: string[];

  constructor () {
    this.code = 403
    this.message = ["Incorrect email address or password, try again."]
  }
}
