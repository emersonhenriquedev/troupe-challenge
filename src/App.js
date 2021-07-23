import 'semantic-ui-css/semantic.min.css'
import Login from './pages/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// import Privates from "./components/Routes/Privates";
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Client from "./pages/Client";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <div className="content">
            <Route path="/login" exact component={Login} />
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/client/:clientId?" exact component={Client} />
          </div>
        </Switch>

      </Router>
    </div>
  );
}

export default App;
