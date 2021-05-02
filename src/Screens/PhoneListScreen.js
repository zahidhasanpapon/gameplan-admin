import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPhones } from "../actions/phoneActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Table } from "react-bootstrap";

const PhoneListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const phoneList = useSelector((state) => state.phoneList);
  const { loading, error, phones } = phoneList;

  console.log(phones);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  useEffect(() => {
    if (adminInfo) {
      dispatch(listPhones());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, adminInfo]);
  return (
    <>
      <h1>Phone Numbers</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {phones.map((phone) => (
              <tr key={phone._id}>
                <td>{phone._id}</td>
                <td>{phone.phone}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PhoneListScreen;
