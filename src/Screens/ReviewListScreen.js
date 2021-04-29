import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listReviews,
  deleteReview,
  createReview,
} from "../actions/reviewActions";
import { REVIEW_CREATE_RESET } from "../constants/reviewConstants";

const ReviewListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const reviewList = useSelector((state) => state.reviewList);
  const { loading, error, reviews } = reviewList;

  const reviewDelete = useSelector((state) => state.reviewDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = reviewDelete;

  const reviewCreate = useSelector((state) => state.reviewCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    review: createdReviw,
  } = reviewCreate;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    dispatch({ type: REVIEW_CREATE_RESET });

    if (!adminInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push(`/reviews/${createdReviw._id}/edit`);
    } else {
      dispatch(listReviews(""));
    }
  }, [
    dispatch,
    history,
    adminInfo,
    successDelete,
    successCreate,
    createdReviw,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteReview(id));
    }
  };

  const createReviewHandler = () => {
    dispatch(createReview());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Reviews</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createReviewHandler}>
            <i className="fas fa-plus"></i> Create Review
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>ID</th>
              <th>NAME</th>
              <th>TEAM</th>
              <th>Quote</th>
              <th>RATING</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review._id}</td>
                <td>{review.image}</td>
                <td>{review.name}</td>
                <td>{review.team}</td>
                <td>{review.quote}</td>
                <td>{review.rating}</td>
                <td>
                  <LinkContainer to={`/reviews/${review._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(review._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ReviewListScreen;
