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
    name: "age",
    label: "Edad del entrevistado",
    type: "number",
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
      { label: "Tokyo", value: "NRT" }
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
    name: "special",
    label: "Experiencia como mentor",
    type: "checkbox"
  }
];

// TODOS:
// Add "other" textfield on radio inputs
// Add helper text
