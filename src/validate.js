import * as R from "ramda";

export function required(value) {
  return (R.isEmpty(value) || R.isNil(value)) && "Campo requerido";
}

export function minLength(length) {
  return (value) => value.length < length && "Respuesta muy corta";
}
