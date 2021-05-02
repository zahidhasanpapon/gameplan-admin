import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ReviewScreen from "./Screens/ReviewScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AdminListScreen from "./Screens/AdminListScreen";
import AdminEditScreen from "./Screens/AdminEditScreen";
import ReviewListScreen from "./Screens/ReviewListScreen";
import ReviewEditScreen from "./Screens/ReviewEditScreen";
import FaqListScreen from "./Screens/FaqListScreen";
import FaqEditScreen from "./Screens/FaqEditScreen";
import PhoneListScreen from "./Screens/PhoneListScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={LoginScreen} exact />
          <Route path="/review/:id" component={ReviewScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/adminlist" component={AdminListScreen} />
          <Route path="/admin/reviewlist" component={ReviewListScreen} />
          <Route path="/admin/:id/edit" component={AdminEditScreen} />
          <Route path="/reviews/:id/edit" component={ReviewEditScreen} />
          <Route path="/admin/faqlist" component={FaqListScreen} />
          <Route path="/faq/edit" component={FaqEditScreen} />
          <Route path="/reviews" component={HomeScreen} />
          <Route path="/phonenumbers" component={PhoneListScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
