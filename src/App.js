import Forgotpw from "./Login/Forgotpw";
import Login from "./Login/Login";
import { BrowserRouter as Router, Route, Switch,} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div>
      <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/forgotpw" component={Forgotpw} />
     </Switch>
    </div>
    </Router>
  );
}

export default App;
