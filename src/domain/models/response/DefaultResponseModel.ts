// Class to build server response with simple action ( redirect to another page )
// export default class DefaultResponseModel {
//   status: number;
//   message: string;
//   content?: any;

//   constructor (params?: { status?: number, message?: string, content?: any }) {
//     this.status = params ? params.status || 200 : 200
//     this.message = params ? params.message || "OK" : "OK"
//     this.content = params ? params.content || null : null
//   }
// }

// Class to build server response  with CQRS
export default class DefaultResponseModel {
  statusCode: number;
  message: string;
  data?: any;

  constructor(params?: { status?: number; errors?: [string]; data?: any }) {
    this.statusCode = params ? params.status || 200 : 200;
    this.message = params && params.errors ? params.errors[0] || "OK" : "OK";
    this.data = params ? params.data || null : null;
  }
}
