import reviews from "../reviews";
import Review from "../components/Review";
import { Col, Row } from "react-bootstrap";

const HomeScreen = () => {
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
