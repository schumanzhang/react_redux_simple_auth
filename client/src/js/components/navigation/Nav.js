import React from "react";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';

@connect((store) => {
  return {
    user: store.auth.user,
    userAuth: store.auth.authenticated
  };
})
export default class Nav extends React.Component {

    logoutUser() {
        this.props.dispatch(logout());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userAuth === false) {
            this.props.dispatch(push('/login'));
        }
    }

    render() {
        return (
            <nav class="navbar navbar-default navbar-static-top m-b-0">
                <div class="navbar-header"> 
                     <ul class="nav navbar-top-links navbar-right pull-right">  
                        <li>
                            <a class="dropdown-toggle waves-effect waves-light" onClick={this.logoutUser.bind(this)}>Logout<i class="icon-options-vertical"></i></a>
                        </li>
                     </ul>
                </div>
            </nav>
        )
    }
}