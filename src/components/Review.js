import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Review = ({ review }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <Link to={`/review/${review._id}`}>
          <Card.Img src={review.image} variant="top" />
        </Link>

        <Card.Body>
          <Link to={`/review/${review._id}`}>
            <Card.Title as="div">
              <strong>{review.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">{review.quote}</div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Review;
