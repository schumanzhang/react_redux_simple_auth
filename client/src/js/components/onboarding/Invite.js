import React from "react";
import { Field, reduxForm } from "redux-form";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { addClient } from '../../actions/onboardActions';

const renderField = ({ input, placeholder, type, meta: { touched, error } }) => (  
    <div className="form-group">
        <div className="col-md-12">
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
    return errors;
}

@connect((store) => {
  return {
    inviteClientInfo: store.onboard.inviteClientInfo,
    invitedClient: store.onboard.invited,
    user:store.auth.user
  };
})
export default class Invite extends React.Component {

    inviteClient(data) {
        data._id = this.props.user._id;
        this.props.dispatch(addClient(data));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.invitedClient === true) {
            this.props.dispatch(push('/main'));
        }
    }

    render(){

        const { handleSubmit, pristine, reset, submitting, errors } = this.props;

        return (
         <div>
            <div className="row m-t-30 m-b-40">
                <div className="col-sm-8 col-sm-offset-2">
                    <div className="white-box m-t-30">
                        <h3 className="box-title m-b-0">Invite your first client to your workspace...</h3>
                        <p className="text-muted m-b-30 font-13">Your client will receive an invitation email</p>
                        <form className="form-horizontal" onSubmit={handleSubmit(this.inviteClient.bind(this))}> 
                            <Field name="firstName" type="text" component={renderField} placeholder="First Name"/>
                            <Field name="lastName" type="text" component={renderField} placeholder="Last Name"/>
                            <Field name="email" type="email" component={renderField} placeholder="Email"/>
                            <button type="submit" class="btn btn-info waves-effect waves-light m-r-10">Next</button>
                        </form>
                    </div>
                </div>
            </div>
         </div>
        );
    }
}

Invite = reduxForm({  
  form: 'inviteForm',
  validate
})(Invite);