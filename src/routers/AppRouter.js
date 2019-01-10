import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from '../components/Login';
import DashboardPage from '../components/DashboardPage';
import SettingsPage from '../components/SettingsPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
export const history = createHistory();


const AppRouter = () => (
    <Router history={history}>
    <div>
        <Switch>
        <PublicRoute exact={true} path="/" component={Login}/>
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/settings"  component={SettingsPage}/>
        <Route component={NotFoundPage}/>
        </Switch>
    </div>
    </Router>
);

export default AppRouter;