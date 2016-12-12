import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { checkUser } from '../../actions/authActions';
import Main from "../../pages/layouts/Main";
import store from "../../store";

export function requireAuthentication(Component) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            console.log('props:', this.props);
            if (this.props.currentUser === 0) {
                this.props.dispatch(push('/login'));
            } else {
                this.checkAuth();
            }
        }

        sendToLoginPage() {
            this.props.dispatch(push('/login'));
        }

        componentWillReceiveProps (nextProps) {
            console.log('nextProps:', nextProps);
            if (nextProps.isAuthenticated !== true) {
                this.props.dispatch(push('/login'));
            }
        }

        checkAuth () {
            this.props.dispatch(checkUser());
        }

        render () {
            const child = this.props.children;
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component childRoutes={child}/>
                        : this.sendToLoginPage.bind(this)
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