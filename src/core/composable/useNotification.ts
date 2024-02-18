import { notification as notification_store } from 'stores/notification/notification';

export const useNotification=()=>{
  const useStoreNotification = notification_store();
  const setListMpaAdquirida =(list:any)=>{
    useStoreNotification.setListMpaAdquirida(list)
  }

  const listMpaAdquirida=useStoreNotification.listMpaAdquirida
  return {
    listMpaAdquirida,
    setListMpaAdquirida,
  }
}
