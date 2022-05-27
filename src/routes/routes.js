import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Admin from "../pages/admin/admin"
import Patient from '../pages/patient/patient';

const Routes = () => (
  <Switch>
      <Route path='/' exact component={Admin} />
      <Route path='/patient' exact component={Patient} />
  </Switch>
);

export default Routes;