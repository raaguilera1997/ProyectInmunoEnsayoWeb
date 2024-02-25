import { defineStore } from 'pinia';
export interface NotificationInterface {
  listMpaAdquirida: any,
  cant: number,
}
export const notification = defineStore('notification', {
  state: (): NotificationInterface => {
    return {
      listMpaAdquirida: [],
      cant:0
    };
  },
  getters: {
    GetListMpaAdquirida(state) {
      return state.listMpaAdquirida;
    },
  },

  actions: {
    setListMpaAdquirida(list:any) {
      this.listMpaAdquirida = list
    },
    setCant(cant:number){
      this.cant = cant
    }
  },
  persist: {
    storage: localStorage,
    paths: ['notification'],
  },
})
