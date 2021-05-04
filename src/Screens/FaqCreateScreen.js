import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createFaq } from "../actions/faqActions";
import FormContainer from "../components/FormContainer";

const FaqCreateScreen = ({ location, history }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const faqCreate = useSelector((state) => state.faqCreate);
  const { loading, error, faq } = faqCreate;

  useEffect(() => {
    if (faq) {
      history.push("/admin/faqlist");
    }
  }, [history, faq]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createFaq(question, answer));
  };

  return (
    <FormContainer>
      <h1>Add new Faq</h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="question">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="answer">
          <Form.Label>answer Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default FaqCreateScreen;
