// @ts-ignore
import { storeToRefs } from 'pinia';
import { user as user_store } from 'src/stores/user/user'
import { auth as auth_store } from 'src/stores/auth/auth'
export const useLogin=()=>{
  const useStoreUser = user_store();
  const useStoreAuth = auth_store();
  const setToken =(token:any)=>{
    useStoreAuth.setToken(token)
  }
  const signOut =()=>{
    useStoreAuth.singOut()
  }
  const setUser =(user:any)=>{
    useStoreUser.setUser(user)
  }
  const token=useStoreAuth.token
  const user =useStoreUser.user
  return {
    signOut,
    setToken,
    setUser,
    user,
    token,
  }
}
