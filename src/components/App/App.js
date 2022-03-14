import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BuildingManagement from '../BuildingManagement/BuildingManagement';
import DeskAssignment from '../DeskAssignment/DeskAssignment';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ForgotPsw from "../Login/ForgotPsw";
import LogIn from "../Login/LogIn";
import OfficeManagement from '../OfficeManagement/OfficeManagement';
import OfficeStatus from '../OfficeStatus/OfficeStatus';
import RequestToWorkRemote from '../RequestToWorkRemote/RequestToWorkRemote';
import UsersManagement from '../UsersManagementPage/UsersManagement';
import RemoteWorkApproval from '../RemoteWorkApproval/RemoteWorkApproval';
import UserStatus from '../UserStatus/UserStatus';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/forgotpw" component={ForgotPsw} />
          <>
            <Header />
            <Route path="/user-management" component={UsersManagement} />
            <Route path="/building-management" component={BuildingManagement} />
            <Route path="/office-management" component={OfficeManagement} />
            <Route path="/office-status" component={OfficeStatus} />
            <Route path="/desk-assignment" component={DeskAssignment} />
            <Route path="/request-to-work-remote" component={RequestToWorkRemote} />
            <Route path="/remote-work-approval" component={RemoteWorkApproval} />
            <Route path="/user-status" component={UserStatus} />
            <Footer />
          </>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
