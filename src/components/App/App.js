import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import ForgotPsw from "../Login/ForgotPsw";
import LogIn from "../Login/LogIn";
import UsersManagement from '../Users Management Page/UsersManagement';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/forgotpw" component={ForgotPsw} />
          <div>
            <Header />
            <Route path="/usermanagement" component={UsersManagement} />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
