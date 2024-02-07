import { defineStore } from 'app/node_modules/pinia';
export interface PermissionInterface {
  name: string;
  code: string;
  id: number;
}
export interface UserInterface {
  email: string;
}
export interface UserStateInterface {
  user: UserInterface | null,
}
export const user = defineStore('user', {
  state: (): UserStateInterface => {
      return {
        user: null,
      };
  },
  getters:{
    GetUser (context: UserStateInterface) {
      return context.user;
    },
  },
  actions: {
    setUser(user: any) {
      this.user = user
    },
  },

  persist: {
    storage: localStorage,
    paths: ['user'],
  },

})
