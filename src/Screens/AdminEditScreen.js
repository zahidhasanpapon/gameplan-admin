import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getAdminDetails, updateAdmin } from "../actions/adminActions";
import { ADMIN_UPDATE_RESET } from "../constants/adminConstants";
import FormContainer from "../components/FormContainer";

const AdminEditScreen = ({ match, history }) => {
  const adminId = match.params.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const adminDetails = useSelector((state) => state.adminDetails);
  const { loading, error, admin } = adminDetails;

  const adminUpdate = useSelector((state) => state.adminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_RESET });
      history.push("/adminlist");
    } else {
      if (!admin.name || admin._id !== adminId) {
        dispatch(getAdminDetails(adminId));
      } else {
        setName(admin.name);
        setEmail(admin.email);
      }
    }
  }, [admin, adminId, dispatch, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateAdmin({ _id: adminId, name, email }));
  };

  return (
    <>
      <Link to="admin/adminlist" className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Admin</h1>
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
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default AdminEditScreen;
