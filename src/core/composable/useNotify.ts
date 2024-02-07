import {notify} from "src/infrastructure/services/VisualNotifyService";

export const useNotify=()=>{
const sendNotifyError=(statusCode: number,errors: [string],module:string,action?:string)=>{
  const text = `<div >We are sorry the action ${action} in <span class="text-uppercase text-bold">${module}</span> did not execute<br>${errors.map((item,index) => `<span class="row col-12 text-caption">${index+1} ${item}</span>`).join('')}</div>`;
    notify({
      content:text,
      type:'negative'
    })
  }
const sendNotifySucess=(statusCode: number,module:string,action?:string,)=>{
  const text = action?`<div >The action <span class="text-bold text-lowercase">${action}</span> in <span class="text-uppercase text-bold">${module}</span> was executed correctly</div>`
                      :`<div >The action in <span class="text-uppercase text-bold">${module}</span> was executed correctly</div>`;
    notify({
      content:text,
      type:'positive'
    })
  }

  return{
    sendNotifySucess,
    sendNotifyError
  }
}
