import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "redux-form";
import { TextField, FormControlLabel, InputLabel } from "@material-ui/core";
import { Checkbox, FormControl, Select, MenuItem } from "@material-ui/core";
import { Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { InputAdornment, IconButton, Grid } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { required } from "../validate";

function Question(props) {
  const type = selectInput(props.type);
  return (
    <div>
      <Field component={type} {...props} />
    </div>
  );
}

function selectInput(type) {
  const inputs = {
    checkbox: FormCheckbox,
    text: FormTextField,
    password: FormPassword,
    select: FormSelect,
    radio: FormRadio,
    array: FormArray
  };
  return inputs[type] || FormTextField;
}

function FormTextField({ label, input, meta, ...custom }) {
  const { touched, invalid, error } = meta;
  return <TextField label={label} error={touched && invalid} helperText={touched && error} InputLabelProps={{ shrink: true }} fullWidth {...input} {...custom} />;
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
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
}

function FormCheckbox({ input, label }) {
  return <FormControlLabel label={label} control={<Checkbox checked={input.value ? true : false} onChange={input.onChange} />} />;
}

function FormSelect(props) {
  const { label, input, meta, options, ...custom } = props;
  const { touched, error } = meta;
  const useTextField = input.value === "other" && custom.other;

  return (
    <FormControl error={touched && error} style={{ minWidth: "100%" }}>
      <InputLabel shrink>{label}</InputLabel>
      <Select {...input} {...custom} inputProps={{ name: input.name }}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {useTextField && <Field required label={label} name={`${input.name}-other`} style={{ marginTop: 10 }} component={FormTextField} validate={[required]} />}
    </FormControl>
  );
}

function FormRadio({ input, label, options, ...custom }) {
  return (
    <FormControl fullWidth style={{ marginTop: 10 }}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...input} {...custom}>
        <Grid container>
          {options.map((option) => (
            <Grid item xs={4}>
              <FormControlLabel key={option.label} value={option.value} control={<Radio />} label={option.label} />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

function FormArray({ input, label, subform, ...custom }) {
  console.log("HOLA");
  return (
    <FormControl fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <FieldArray
        {...input}
        {...custom}
        component={({ fields, meta: { error } }) => (
          <div>
            <button type="button" onClick={() => fields.push({})}>
              Add Member
            </button>
            {/* {error && <span>{error.name}</span>} */}
            {fields.map((field, index) => (
              <div>
                <button type="button" onClick={() => fields.remove(index)}>
                  Remove
                </button>
                {subform.map((formInput) => {
                  return <Question {...formInput} name={`${input.name}.${formInput.name}`} />;
                })}
                {/* <h4>Member #{index + 1}</h4> */}
                {/* <Field
                    name={`${member}.firstName`}
                    type="text"
                    component={renderField}
                    label="First Name"
                  />
                  <Field
                    name={`${member}.lastName`}
                    type="text"
                    component={renderField}
                    label="Last Name"
                  />
                  <FieldArray
                    name={`${member}.hobbies`}
                    component={renderHobbies}
                  /> */}
              </div>
            ))}
          </div>
        )}
      />
    </FormControl>
  );
}

Question.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "checkbox", "password", "select", "radio", "array"]),
  required: PropTypes.bool,
  validate: PropTypes.arrayOf(PropTypes.func),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    })
  )
};

Question.defaultProps = {
  required: false
};

export default Question;
