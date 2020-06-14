import React from 'react';
import { Switch } from 'react-router-dom';

import {
  SignIn,
  SignUp,
  ForgotPassword,
  Dashboard,
  ResetPassword,
  Profile,
} from '../pages';

import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
