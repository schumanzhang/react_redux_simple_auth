import React from "react";
import { Field, reduxForm } from "redux-form";
import { push } from 'react-router-redux';
import { connect } from "react-redux";

import { login } from '../../actions/authActions';

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (  
    <div className="form-group">
        <div className="col-xs-12">
            <input {...input} placeholder={placeholder} type={type} className="form-control"/>
            {touched && (error && <div className="help-block has-error">{error}</div>)}
        </div>
    </div>
);

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Password is Required';
    } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 6 characters';
    }
    return errors;
}

@connect((store) => {
  return {
    user: store.auth.user,
    userFetched: store.auth.authenticated,
    userError: store.auth.error
  };
})
export default class Login extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.userFetched === true) {
            this.props.dispatch(push('/onboarding'));
        }
    }

    loginUser(data) {
        this.props.dispatch(login(data));
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, errors } = this.props;
        var errorMessage = 'Your user credentials are incorrect...';

        return (
            <section class="blue-backdrop">
                <div class="login-box">
                    <div class="white-box">
                    <form class="form-horizontal form-material" onSubmit={handleSubmit(this.loginUser.bind(this))}>
                        <h3 class="box-title m-b-20">Sign In</h3>
                        <Field name="username" type="username" component={renderField} placeholder="Email"/>
                        <Field name="password" type="password" component={renderField} placeholder="Password"/>
                        <div class="form-group">
                        <div class="col-md-12">
                            <a href="javascript:void(0)" id="to-recover" class="text-dark pull-left"><i class="fa fa-lock m-r-5"></i> Forgot password?</a> </div>
                        </div>
                        <div class="form-group text-center m-t-20">
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" disabled={pristine || submitting || errors} type="submit"> Log In</button>
                        </div>
                        </div>
                        <div class="form-group m-b-0">
                        <div class="col-sm-12 text-center">
                            <p>Don't have an account? <a href="#/register" class="text-primary m-l-5"><b>Sign Up</b></a></p>
                        </div>
                        </div>
                    </form>
                    <div>
                    {this.props.userError !== null ? <div className="help-block has-error text-center">{errorMessage}</div> : ''}
                    </div>

                    </div>
                </div>
            </section>   
        );
    }
}

Login = reduxForm({  
  form: 'loginForm',
  validate
})(Login);