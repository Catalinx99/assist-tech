import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BuildingManagement from '../BuildingManagement/BuildingManagement';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ForgotPsw from "../Login/ForgotPsw";
import LogIn from "../Login/LogIn";
import OfficeManagement from '../OfficeManagement/OfficeManagement';
import UsersManagement from '../UsersManagementPage/UsersManagement';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/forgotpw" component={ForgotPsw} />
          <div>
            <Header />
            <Route path="/user-management" component={UsersManagement} />
            <Route path="/building-management" component={BuildingManagement} />
            <Route path="/office-management" component={OfficeManagement} />
            <Footer />
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
