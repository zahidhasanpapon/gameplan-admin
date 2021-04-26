import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import reviews from "../reviews";

const ReviewScreen = ({ match }) => {
  const review = reviews.find((r) => r._id === match.params.id);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={review.image} alt={review.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>Name: {review.name}</ListGroup.Item>
            <ListGroup.Item>Quote: {review.quote}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ReviewScreen;
