// import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

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
          <Route path="/usermanagement" component={UsersManagement} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
