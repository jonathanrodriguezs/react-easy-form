import React from "react";
import Quiz from "./Quiz";
import { Container } from "@material-ui/core";
import questions from "./../questions";

function App() {
  const handleSubmit = (values) => alert(JSON.stringify(values, null, 2));
  return (
    <Container style={{ maxWidth: 600 }}>
      <Quiz
        title="Developer recruitment form"
        subtitle="Interviewee: Jonathan Rodriguez"
        questions={questions}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default App;
