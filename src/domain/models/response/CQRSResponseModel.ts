// Class to build server response  with CQRS
export default class CQRSResponseModel {
  statusCode: number;
  message: string;
  data?: any;

  constructor(params?: { statusCode?: number; errors?: [string]; data?: any }) {
    this.statusCode = params ? params.statusCode || 200 : 200;
    this.message = params && params.errors ? params.errors[0] || "OK" : "OK";
    this.data = params ? params.data || null : null;
  }
}
