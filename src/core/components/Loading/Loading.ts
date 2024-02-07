import {Loading} from "quasar";

export function LoadShow (message:string) {
  Loading.show({
    message: message,
  });
}
export function LoadHide () {
   Loading.hide()
}

