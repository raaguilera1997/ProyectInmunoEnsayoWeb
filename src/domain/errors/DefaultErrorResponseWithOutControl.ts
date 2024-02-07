// Class to build server error response with out controller
export default class DefaultErrorResponseWithOutControl {
  statusCode: number;
  message: [];
  data?: any;

  constructor(params: { message: [] , status?: number}) {
    this.statusCode = params.status ? params.status : 501;
    this.message = params.message;
  }
}
