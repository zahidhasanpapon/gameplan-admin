// Redux
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { listReviewDetails } from "../actions/reviewActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
// import axios from "axios";
// const url = "http://localhost:5000/reviews";

const ReviewScreen = ({ match }) => {
  // Redux
  const dispatch = useDispatch();
  const reviewDetails = useSelector((state) => state.reviewDetails);
  const { loading, error, review } = reviewDetails;
  useEffect(() => {
    dispatch(listReviewDetails(match.params.id));
  }, [dispatch, match]);

  // const [review, setReview] = useState([]);
  // useEffect(() => {
  //   const fetchReview = async () => {
  //     const { data } = await axios.get(`${url}/${match.params.id}`);
  //     setReview(data);
  //   };
  //   fetchReview();
  // }, [match]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={review.image} alt={review.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>Name: {review.name}</ListGroup.Item>
              <ListGroup.Item>Review: {review.review}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ReviewScreen;
