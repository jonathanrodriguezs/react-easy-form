import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, FormControlLabel, InputLabel } from "@material-ui/core";
import { Checkbox, FormControl, Select, MenuItem } from "@material-ui/core";
import { Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Field } from "redux-form";
import { required } from "../validate";

function Question(props) {
  return (
    <div>
      <Field component={selectInput(props.type)} {...props} />
    </div>
  );
}

function selectInput(type) {
  const inputs = {
    checkbox: FormCheckbox,
    text: FormTextField,
    password: FormPassword,
    select: FormSelect,
    radio: FormRadio
  };
  return inputs[type] || FormTextField;
}

function FormTextField({ label, input, meta, ...custom }) {
  const { touched, invalid, error } = meta;
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      fullWidth
      {...input}
      {...custom}
    />
  );
}

function FormPassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  return (
    <FormTextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

function FormCheckbox({ input, label }) {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
    />
  );
}

function FormSelect(props) {
  console.log(props);
  const { label, input, meta, options, ...custom } = props;
  const { touched, error } = meta;
  const useTextField = input.value === "other" && custom.other;

  return (
    <FormControl error={touched && error} style={{ minWidth: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <Select {...input} {...custom} inputProps={{ name: input.name }}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {useTextField && (
        <Field
          label={label}
          name={`${input.name}-other`}
          style={{ marginTop: 12 }}
          component={FormTextField}
          validate={[required]}
        />
      )}
    </FormControl>
  );
}

function FormRadio({ input, label, options, ...custom }) {
  return (
    <FormControl style={{ marginTop: 15, marginBottom: -7 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...input} {...custom}>
        {options.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

Question.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "checkbox", "password", "select", "radio"]),
  required: PropTypes.bool,
  validate: PropTypes.arrayOf(PropTypes.func),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.boolean
      ])
    })
  )
};

Question.defaultProps = {
  required: false
};

export default Question;
