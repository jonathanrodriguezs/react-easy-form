import React from "react";
import Quiz from "./Quiz";
import { Container } from "@material-ui/core";
import questions from "./../questions";

function App() {
  const handleSubmit = (values) => alert(JSON.stringify(values, null, 2));
  return (
    <Container style={{ maxWidth: 600 }}>
      <Quiz
        title="Identificación de Mentores"
        subtitle="CASO 2020-10-JROS1"
        questions={questions}
        onSubmit={handleSubmit}
      />
    </Container>
  );
}

export default App;
