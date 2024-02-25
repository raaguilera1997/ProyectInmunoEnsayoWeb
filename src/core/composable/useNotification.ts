import { notification as notification_store } from 'stores/notification/notification';

export const useNotification=()=>{
  const useStoreNotification = notification_store();
  const setListMpaAdquirida =(list:any)=>{
    useStoreNotification.setListMpaAdquirida(list)
  }
  const setCant=(cant:any)=>{
    useStoreNotification.setCant(cant)
  }
  const listMpaAdquirida=useStoreNotification.listMpaAdquirida
  const cant=useStoreNotification.cant
  return {
    listMpaAdquirida,
    setListMpaAdquirida,
    setCant,
    cant
  }
}
