import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listContacts, deleteContact } from "../actions/contactActions";

const ContactListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listContacts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, adminInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteContact(id));
    }
  };

  return (
    <>
      <h1>Contact Lists</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>Message</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact._id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.message}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(contact._id)}
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

export default ContactListScreen;
