import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory } from "react-router";
//import { UserAuthWrapper } from 'redux-auth-wrapper';
import { Provider } from "react-redux";
import { routerReducer, syncHistoryWithStore, routerActions } from 'react-router-redux';

//Components
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Loading from "./components/auth/Loading";
import Main from "./pages/layouts/Main";
import Clients from "./pages/layouts/Clients";
import Conference from "./pages/layouts/Conference";
import Dashboard from "./pages/layouts/Dashboard";
import Schedule from "./pages/layouts/Schedule";
import Onboarding from "./pages/layouts/Onboarding";


//functions
import { requireAuthentication } from "./components/auth/RequireAuthentication";

import store from "./store";

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
    <Router history={hashHistory}>
        <Route path="/main" component={requireAuthentication(Main)}>
            <IndexRoute component={Dashboard}></IndexRoute>
            <Route path="/clients" name="clients" component={Clients}></Route>
            <Route path="/conference" name="conference" component={Conference}></Route>
            <Route path="/schedule" name="schedule" component={Schedule}></Route>
        </Route>
        <Route path="/onboarding" component={requireAuthentication(Onboarding)}>
             <IndexRoute component={General}></IndexRoute>
             <Route path="/invite" name="invite" component={Invite}></Route>
        </Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
    </Router>
    </Provider>,
app);