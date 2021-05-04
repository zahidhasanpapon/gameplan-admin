import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listPhones, deletePhone } from "../actions/phoneActions";

const PhoneListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const phoneList = useSelector((state) => state.phoneList);
  const { loading, error, phones } = phoneList;

  const phoneDelete = useSelector((state) => state.phoneDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = phoneDelete;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listPhones());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, adminInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deletePhone(id));
    }
  };

  return (
    <>
      <h1>Requested Phone Numbers</h1>
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

              <th>PHONE</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {phones.map((ph) => (
              <tr key={ph._id}>
                <td>{ph._id}</td>
                <td>{ph.phone}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(ph._id)}
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

export default PhoneListScreen;
