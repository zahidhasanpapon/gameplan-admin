import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAdmins, deleteAdmin } from "../actions/adminActions";

const AdminListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const adminList = useSelector((state) => state.adminList);
  const { loading, error, admins } = adminList;

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const adminDelete = useSelector((state) => state.adminDelete);
  const { success: successDelete } = adminDelete;

  useEffect(() => {
    if (adminInfo) {
      dispatch(listAdmins());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, adminInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteAdmin(id));
    }
  };

  return (
    <>
      <h1>Admins</h1>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.name}</td>
                <td>
                  <a href={`mailto:${admin.email}`}>{admin.email}</a>
                </td>
                <td>
                  <LinkContainer to={`admin/${admin._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(admin._id)}
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

export default AdminListScreen;
