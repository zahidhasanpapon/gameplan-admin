import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./Screens/HomeScreen";
import ReviewScreen from "./Screens/ReviewScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/review/:id" component={ReviewScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
