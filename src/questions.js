import { required, minLength, maxLength } from "./validate";

export default [
  {
    name: "name",
    label: "Interviewer name",
    type: "text",
    required: true,
    validate: [required(), minLength(10)]
  },
  {
    name: "secret",
    label: "Secret key",
    type: "password",
    required: true,
    validate: [required()]
  },
  {
    name: "hometown",
    label: "Hometown",
    type: "select",
    options: [
      { label: "Monterrey", value: "MTY" },
      { label: "Mexico City", value: "CDMX" },
      { label: "Washington D.C.", value: "US-WA" },
      { label: "Other", value: "other" }
    ],
    required: true,
    enableOther: true,
    validate: [required()]
  },
  {
    name: "language",
    label: "Main programming language",
    type: "radio",
    options: [
      { label: "Golang", value: "GO" },
      { label: "Python", value: "PYTHON" },
      { label: "Rust", value: "RUST" },
      { label: "C++", value: "CPP" },
      { label: "Clojure", value: "CLOJURE" },
      { label: "Assembly x86", value: "ASM" }
    ]
  },
  {
    name: "notes",
    label: "Notes",
    type: "text",
    multiline: true,
    rows: 2
  },
  {
    name: "experience",
    label: "Has experience as a mentor",
    type: "checkbox"
  },
  {
    name: "persons",
    label: "Work reference",
    type: "array",
    validate: [required()],
    subform: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        required: true,
        validate: [required()]
      },
      {
        name: "phone",
        label: "Phone number",
        type: "text",
        validate: [maxLength(13)]
      }
    ]
  }
];

// TODOS:
// Add helper text
// Add form grid
// E2E testing
// Multisteps form
// Github action to publish to npm and test
