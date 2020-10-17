import { required, minLength } from "./validate";

export default [
  {
    name: "name",
    label: "Nombre del entrevistado",
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
    name: "language",
    label: "Lenguaje de programación principal",
    type: "radio",
    options: [
      { label: "C++", value: "cpp" },
      { label: "Python", value: "python" },
      { label: "Java", value: "java" },
      { label: "Common Lisp", value: "clisp" }
    ]
  },
  {
    name: "city",
    label: "Ciudad de origen",
    type: "select",
    options: [
      { label: "Monterrey", value: "MTY" },
      { label: "Guadalajara", value: "GDL" },
      { label: "Tokyo", value: "NRT" },
      { label: "Otra", value: "other" }
    ],
    required: true,
    other: true,
    validate: [required]
  },
  {
    name: "notes",
    label: "Notas",
    type: "text",
    multiline: true,
    rows: 2
  },
  {
    name: "special",
    label: "Experiencia como mentor",
    type: "checkbox"
  }
];

// TODOS:
// Add validation function
// Add helper text
// Add form grid
// Add field array
