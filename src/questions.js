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
    name: "organization",
    label: "Organización del entrevistador",
    type: "radio",
    // required: true,
    options: [
      { label: "ACNUR", value: "ACNUR" },
      { label: "FM4", value: "FM4" },
      { label: "PCR", value: "PCR" }
    ]
    // validate: [required]
  },
  {
    name: "city",
    label: "Ciudad de origen",
    type: "select",
    options: [
      { label: "Tenosique", value: "TENO" },
      { label: "Monterrey", value: "MONT" },
      { label: "Guadalajara", value: "GDJR" },
      { label: "Oaxaca", value: "OAXA" }
    ]
  },
  {
    name: "notes",
    label: "Notas",
    type: "text",
    multiline: true,
    rows: 3
  },
  {
    name: "special",
    label: "Requiere atención especial",
    type: "checkbox"
  }
];

// TODOS:
// Add "other" textfield
// Add validation function
// Add helper text
