import { useDispatch, useSelector } from "react-redux";
import { listReviews } from "../actions/reviewActions";
import { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Review from "../components/Review";
import { Col, Row } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

const HomeScreen = () => {
  const dispatch = useDispatch();
  const reviewList = useSelector((state) => state.reviewList);
  const { loading, reviews, error } = reviewList;

  useEffect(() => {
    dispatch(listReviews());
  }, [dispatch]);

  console.log(reviews);

  return (
    <>
      <h1>Reviews by Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger ">{error}</Message>
      ) : (
        <Row>
          {reviews.map((review) => (
            <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
              <Review review={review} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
