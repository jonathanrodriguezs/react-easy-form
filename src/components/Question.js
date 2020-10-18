import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, FieldArray } from "redux-form";
import { TextField, FormControlLabel, InputLabel } from "@material-ui/core";
import { Checkbox, FormControl, Select, MenuItem } from "@material-ui/core";
import { Radio, RadioGroup, FormLabel } from "@material-ui/core";
import { InputAdornment, IconButton, Grid, Button } from "@material-ui/core";
import { Visibility, VisibilityOff, Add, Clear } from "@material-ui/icons";
import { required } from "../validate";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  alignRigth: {
    float: "right"
  },
  select: {
    minWidth: "100%"
  },
  marginTop: {
    marginTop: theme.spacing(1)
  },
  subform: {
    paddingLeft: 20,
    borderLeft: "1px solid #2d2d2d",
    "& > div  .MuiInputBase-root": {
      marginBottom: theme.spacing(1)
    }
  }
}));

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
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      InputLabelProps={{ shrink: true }}
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
        <Checkbox checked={input.value ? true : false} onChange={input.onChange} />
      }
    />
  );
}

function FormSelect(props) {
  const { label, input, meta, options, enableOther, ...custom } = props;
  const useTextField = input.value === "other" && enableOther;
  const { touched, error } = meta;
  const classes = useStyles();

  return (
    <FormControl error={touched && error} className={classes.select}>
      <InputLabel shrink>{label}</InputLabel>
      <Select {...input} {...custom} inputProps={{ name: input.name }}>
        {options.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {useTextField && (
        <Field
          required
          label={label}
          name={`${input.name}-other`}
          className={classes.marginTop}
          component={FormTextField}
          validate={[required()]}
        />
      )}
    </FormControl>
  );
}

function FormRadio({ input, label, options, ...custom }) {
  const classes = useStyles();
  return (
    <FormControl fullWidth className={classes.marginTop}>
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup {...input} {...custom}>
        <Grid container>
          {options.map((option, index) => (
            <Grid key={`${option.value}-${index}`} item xs={4}>
              <FormControlLabel
                key={option.label}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            </Grid>
          ))}
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}

function ArrayFields({ fields, label, subform }) {
  const classes = useStyles();
  return (
    <div>
      <Button
        fullWidth
        type="button"
        variant="outlined"
        startIcon={<Add />}
        onClick={() => fields.push({})}
      >
        {label}
      </Button>

      <div className={classes.subform}>
        {fields.map((field, index) => {
          return (
            <div key={field}>
              <Button
                type="button"
                color="secondary"
                onClick={() => fields.remove(index)}
                endIcon={<Clear />}
                className={classes.alignRigth}
              >
                {label} #{index + 1}
              </Button>
              {subform.map((formInput) => {
                const name = `${field}.${formInput.name}`;
                return <Question key={name} {...formInput} name={name} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FormArray({ input, ...custom }) {
  return (
    <FormControl fullWidth>
      <FieldArray {...input} {...custom} component={ArrayFields} />
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
