import React from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Question from "./Question";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(5),
    "& > *": {
      marginBottom: theme.spacing(1)
    }
  }
}));

function Quiz({ title, subtitle, questions, ...props }) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
      <form className={classes.form}>
        {questions.map((item, index) => (
          <Question key={`${item.text}-${index}`} {...item} />
        ))}
        <QuizButtons {...props} />
      </form>
    </div>
  );
}

function QuizButtons({ handleSubmit, pristine, submitting, invalid, reset }) {
  return (
    <div>
      <Button
        id="submit"
        type="submit"
        disabled={invalid}
        onClick={handleSubmit}
        color="primary"
      >
        Submit
      </Button>
      <Button onClick={reset} disabled={pristine || submitting}>
        Reset
      </Button>
    </div>
  );
}

Quiz.defaultProps = {
  questions: []
};

Quiz.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  questions: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool,
  reset: PropTypes.func
};

export default reduxForm({ form: "quiz" })(Quiz);
