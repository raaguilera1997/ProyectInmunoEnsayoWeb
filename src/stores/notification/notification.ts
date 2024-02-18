import { defineStore } from 'pinia';
export interface NotificationInterface {
  listMpaAdquirida: any
}
export const notification = defineStore('notification', {
  state: (): NotificationInterface => {
    return {
      listMpaAdquirida: []
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
    }
  },
  persist: {
    storage: localStorage,
    paths: ['notification'],
  },
})
