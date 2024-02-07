import {defineStore} from 'app/node_modules/pinia';
import {getAuth, signInWithEmailAndPassword,signOut} from "app/node_modules/firebase/auth";
import {Router} from "src/infrastructure/router/index"
export interface AuthStateInterface {
  token: string | null;
  refreshToken: string | null;
  email: string | null
}

export const auth = defineStore('auth', {
  state: (): AuthStateInterface => {
    return {
      token: null,
      refreshToken: null,
      email: null
    };
  },
  getters: {
    GetToken(state) {
      return state.token;
    },
    GetRefreshToken(state) {
      return state.refreshToken;
    },
    GetEmail(state) {
      return state.email;
    }
  },
  actions: {
    setToken(token:any){
      this.token=token
    },
    async singOut() {
      this.token=null
      Router.push({name: 'LoginPage'})
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token', 'refreshToken','email'],
  },
});
