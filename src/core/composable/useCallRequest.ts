import {useNotify} from "src/core/composable/useNotify";
import {notify} from "src/infrastructure/services/VisualNotifyService";

export  const  useCallRequest =async ( callController: any,show_notification_success:boolean,module:string,action:string) => {
  let resp:any=null
    await callController.then(async( response:any)=>{
    if(response.statusCode>=200 && response.statusCode<=299&&response.data!=false) {
       if(show_notification_success){
         useNotify().sendNotifySucess(response.statusCode,module,action)
       }
      resp=response
    }
    else{
      //For Confirm Pasword
      if(response.statusCode>=200 && response.statusCode<=299&&response.data==false){
        useNotify().sendNotifyError(response.statusCode,["access denied"],module,action)
      }
      else{
        useNotify().sendNotifyError(response.statusCode,response.errors,module,action)
      }
    }
  })
  return{
    resp
  }
}
