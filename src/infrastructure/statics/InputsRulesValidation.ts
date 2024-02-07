// @ts-ignore
import * as yup from "yup";
//@ts-ignore
import { defineRule, } from "vee-validate";
import { required, email,url} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("url", url);
function min(length: number, message = "") {
  const minLength = length;
  return (val: string) => {
    if (val.length < minLength) {
      return message || `The value must be at least ${length} characters long`;
    } else {
      return true;
    }
  };
}
function minNumber(length: number, message = "") {
  const minLength = length;
  return (val: number) => {
    if (val < minLength) {
      return message || '';
    } else {
      return true;
    }
  };
}
function max(length: number, message = "") {
  const maxLength = length;
  return (val: string) => {
    if (val.length > maxLength) {
      return message || `The value not be longer than ${length} characters`;
    } else {

      return true;
    }
  };
}
function password (message = "") {
  return (val: string) => {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.$%^&*])(?=.{8,})"
    )
    return passwordRegex.test(val) || message
  }
}

// @ts-ignore

export {
  required,
  url,
  min,
  max,
  minNumber,
  email,
  password
}
