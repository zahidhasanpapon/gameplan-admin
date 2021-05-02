import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createFaq } from "../actions/faqActions";
import FormContainer from "../components/FormContainer";

const FaqEditScreen = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const faqCreate = useSelector((state) => state.faqCreate);
  // const { loading, error, faq } = faqCreate;
  const { loading, error } = faqCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createFaq(question, answer));
  };

  return (
    <div>
      <FormContainer>
        <h1>Add new Faq</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="question">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="answer">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Add
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default FaqEditScreen;
