import { required, minLength } from "./validate";

export default [
  {
    name: "name",
    label: "Nombre del entrevistador",
    type: "text",
    required: true,
    validate: [required, minLength(10)]
  },
  {
    name: "secret",
    label: "Clave del proceso",
    type: "password",
    required: true,
    validate: [required]
  },
  {
    name: "city",
    label: "Ciudad de origen",
    type: "select",
    options: [
      { label: "Monterrey", value: "MTY" },
      { label: "Guadalajara", value: "GDL" },
      { label: "Ciudad de México", value: "CDMX" },
      { label: "Otra", value: "other" }
    ],
    required: true,
    other: true,
    validate: [required]
  },
  {
    name: "language",
    label: "Lenguaje de programación principal",
    type: "radio",
    options: [
      { label: "Golang", value: "go" },
      { label: "Python", value: "python" },
      { label: "Rust", value: "rust" },
      { label: "C++", value: "cpp" },
      { label: "Clojure", value: "clojure" },
      { label: "Assembly x86", value: "asm" }
    ]
  },
  {
    name: "notes",
    label: "Notas",
    type: "text",
    multiline: true,
    rows: 2
  },
  {
    name: "experience",
    label: "Experiencia como mentor",
    type: "checkbox"
  },
  {
    name: "persons",
    label: "Personas",
    type: "array",
    subform: [
      {
        name: "name",
        label: "Nombre del entrevistador",
        type: "text",
        required: true,
        validate: [required, minLength(10)]
      }
    ]
  }
];

// TODOS:
// Add helper text
// Add form grid
// Add field array
