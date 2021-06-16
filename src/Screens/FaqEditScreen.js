import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getFaqDetails, updateFaq } from "../actions/faqActions";
import FormContainer from "../components/FormContainer";
import { FAQ_UPDATE_RESET } from "../constants/faqConstants";
import { Link } from "react-router-dom";

const FaqEditScreen = ({ match, history }) => {
  const faqId = match.params.id;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();

  const faqDetails = useSelector((state) => state.faqDetails);
  const { loading, error, faq } = faqDetails;

  const faqUpdate = useSelector((state) => state.faqUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = faqUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FAQ_UPDATE_RESET });
      history.push("/admin/faqlist");
    } else {
      if (!faq.question || faq._id !== faqId) {
        dispatch(getFaqDetails(faqId));
      } else {
        setQuestion(faq.question);
        setAnswer(faq.answer);
      }
    }
  }, [faq, faqId, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateFaq({ _id: faqId, question, answer }));
  };

  return (
    <>
      <Link to="/admin/reviewlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Faq</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default FaqEditScreen;
