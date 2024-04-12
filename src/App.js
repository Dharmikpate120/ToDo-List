import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="this is your alert" />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/Signin">
                <Signin />
              </Route>
              <Route exact path="/Signup">
                <Signup />
              </Route>

              <Route exact path="/About">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
