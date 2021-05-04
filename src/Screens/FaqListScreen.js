import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listFaqs, deleteFaq } from "../actions/faqActions";
import { Link } from "react-router-dom";

const FaqListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const faqList = useSelector((state) => state.faqList);
  const { loading, error, faqs } = faqList;

  const faqDelete = useSelector((state) => state.faqDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = faqDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listFaqs());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, adminInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteFaq(id));
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>FAQs</h1>
        </Col>
        <Col className="text-right">
          <Link to="/faq/new">Create New Faq</Link>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>QUESTION</th>
              <th>ANSWER</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq._id}</td>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <LinkContainer to={`faq/${faq._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(faq._id)}
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

export default FaqListScreen;
