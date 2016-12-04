import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { checkUser } from '../../actions/authActions';
import Main from "../../pages/layouts/Main";
import store from "../../store";

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount () {
            this.checkAuth();
        }

        componentWillReceiveProps (nextProps) {
            console.log('received new props', nextProps);
            if (nextProps.isAuthenticated !== true) {
                this.props.dispatch(push('/login'));
            }
            //send to either onboarding or main?
        }

        checkAuth () {
            this.props.dispatch(checkUser());
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component/>
                        : null
                    }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        currentUser: state.auth.user,
        isAuthenticated: state.auth.authenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}