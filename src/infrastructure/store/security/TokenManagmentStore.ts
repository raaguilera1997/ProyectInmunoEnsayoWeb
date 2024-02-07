import { LocalStorage } from "quasar";
import {useLogin} from "src/core/composable/useLogin";

const tokenName = "_token_";
const refreshTokenName = "_refresh_token_";

export function setTokensLocalStorage(params: {
  token: string;
  refreshToken: string;
}) {
  LocalStorage.set(tokenName, params.token);
  LocalStorage.set(refreshTokenName, params.refreshToken);
}

export function setAccessTokensLocalStorage(params: { token: string }) {
  LocalStorage.set(tokenName, params.token);
}

export function setRefreshTokensLocalStorage(params: { token: string }) {
  LocalStorage.set(refreshTokenName, params.token);
}

export function getAccessTokenFromLocalStorage() {
  const {token}=useLogin()
  return token
}

export function getRefreshTokenFromLocalStorage() {
  return LocalStorage.getItem(refreshTokenName);
}

export function cleanTokenFromLocalStorage() {
  LocalStorage.remove(tokenName);
  LocalStorage.remove(refreshTokenName);
}
