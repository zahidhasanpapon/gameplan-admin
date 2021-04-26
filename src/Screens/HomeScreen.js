import axios from "axios";
import { useState, useEffect } from "react";
import Review from "../components/Review";
import { Col, Row } from "react-bootstrap";
import dotenv from "dotenv";
dotenv.config();

const url = "http://localhost:5000/reviews";

const HomeScreen = () => {
  const [reviews, setReviews] = useState([]);

  // Using axios
  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(url);
      setReviews(data);
    };
    fetchReviews();
  }, []);

  // Usign built-in fetch
  // const fetchReviews = async () => {
  //   try {
  //     const response = await fetch(url);
  //     const reviews = await response.json();
  //     setReviews(reviews);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchReviews();
  // }, []);

  return (
    <>
      <h1>Reviews by Users</h1>
      <Row>
        {reviews.map((review) => (
          <Col key={review._id} sm={12} md={6} lg={4} xl={3}>
            <Review review={review} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
