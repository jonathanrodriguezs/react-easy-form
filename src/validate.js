import * as R from "ramda";

export function required(message = "Campo requerido") {
  return (value) => (R.isEmpty(value) || R.isNil(value)) && message;
}

export function minLength(length, message = "Respuesta muy corta") {
  return (value) => value && value.length < length && message;
}

export function maxLength(length, message = "Respuesta muy larga") {
  return (value) => value && value.length > length && message;
}
