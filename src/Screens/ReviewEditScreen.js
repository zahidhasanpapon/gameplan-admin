import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listReviewDetails, updateReview } from "../actions/reviewActions";
import FormContainer from "../components/FormContainer";
import { REVIEW_UPDATE_RESET } from "../constants/reviewConstants";

const ReviewEditScreen = ({ match, history }) => {
  const reviewId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [team, setTeam] = useState("");
  const [quote, setQuote] = useState("");
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading, error, review } = reviewDetails;

  const reviewUpdate = useSelector((state) => state.reviewUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = reviewUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: REVIEW_UPDATE_RESET });
      history.push("");
    } else {
      if (!review.name || review._id !== reviewId) {
        dispatch(listReviewDetails(reviewId));
      } else {
        setName(review.name);
        setImage(review.image);
        setTeam(review.team);
        setQuote(review.quote);
        setRating(review.rating);
      }
    }
  }, [review, reviewId, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateReview({
        _id: reviewId,
        name,
        image,
        team,
        quote,
        rating,
      })
    );
  };

  return (
    <>
      <Link to="/admin/reviewlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Review</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="team">
              <Form.Label>Team</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="review">
              <Form.Label>Review</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Review"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
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

export default ReviewEditScreen;
