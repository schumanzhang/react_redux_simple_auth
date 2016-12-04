import _ from "lodash";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { register } from '../../actions/authActions';

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
    if (!values.firstName) {
        errors.firstName = 'First name is required';
    }
    if (!values.lastName) {
        errors.lastName = 'Last name is required';
    }
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
    if (!values.password2) {
        errors.password2 = 'Confirm Password is Required';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Your passwords do not match, please check again';
    }
    return errors;
}

@connect((store) => {
  return {
    user: store.auth.user,
    userFetched: store.auth.authenticated
  };
})
export default class Register extends React.Component {

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.userFetched === true) {
            this.props.dispatch(push('/onboarding'));
        }
    }
    
    registerUser(data) {
        this.props.dispatch(register(data));
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, errors } = this.props;

        return (
            <section className="blue-backdrop">
                  <div className="login-box">
                    <div className="white-box">
                        <form className="form-horizontal form-material" onSubmit={handleSubmit(this.registerUser.bind(this))}> 
                            <h3 className="box-title m-b-20">Sign up to Virtuoso</h3>
                            <Field name="firstName" type="text" component={renderField} placeholder="First Name"/>
                            <Field name="lastName" type="text" component={renderField} placeholder="Last Name"/>
                            <Field name="email" type="email" component={renderField} placeholder="Email"/>
                            <Field name="password" type="password" component={renderField} placeholder="Password"/>
                            <Field name="password2" type="password" component={renderField} placeholder="Confirm Password"/>
                            <div className="form-group text-center m-t-20">
                            <div className="col-xs-12">
                                <button className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" disabled={pristine || submitting || errors} type="submit">Sign Up</button>
                            </div>
                            </div>
                            <div className="form-group m-b-0">
                            <div className="col-sm-12 text-center">
                                <p>Already have an account? <a href="#/login" className="text-primary m-l-5"><b>Sign In</b></a></p>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        );
    }
}

Register = reduxForm({  
  form: 'registerForm',
  validate
})(Register);