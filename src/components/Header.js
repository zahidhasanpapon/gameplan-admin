import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/adminActions";

const Header = () => {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Gamepaln Admin</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/reviews">
                <Nav.Link>Reviews</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faq">
                <Nav.Link>FAQ</Nav.Link>
              </LinkContainer>
              {adminInfo ? (
                <NavDropdown title={adminInfo.name} id="adminname">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/adminlist">
                    <NavDropdown.Item>Admin List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/reviewlist">
                    <NavDropdown.Item>Reviews</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/faqlist">
                    <NavDropdown.Item>Faqs</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/contacts">
                    <NavDropdown.Item>Contacts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/phonenumbers">
                    <NavDropdown.Item>Phone Numbers</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {/* {adminInfo && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/adminlist">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/reviewlist">
                    <NavDropdown.Item>Reviews</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/faqlist">
                    <NavDropdown.Item>Faqs</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
