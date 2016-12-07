import React from "react";
import { Field, reduxForm } from "redux-form";
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/onboardActions';

const renderField = ({ input, placeholder, label, example, type, meta: { touched, error } }) => (  
    <div className="form-group">
        <label class="col-md-12">{label}<span class="help">{example}</span></label>
        <div className="col-md-12">
            {type === 'textarea' && <textarea {...input} className="form-control" rows="5" placeholder={placeholder}></textarea>}
            {type === 'select' && 
            <select {...input} className="form-control">
                <option>Finance</option>
                <option>Consulting</option>
                <option>Professional Services</option>
                <option>Personal Coaching</option>
                <option>Other</option>
            </select>}
            {type !== 'textarea' && type !== 'select' && <input {...input} placeholder={placeholder} type={type} className="form-control"/>}
            {touched && (error && <div className="help-block has-error">{error}</div>)}
        </div>
    </div>
);

const validate = values => {
    const errors = {};
    if (!values.company) {
        errors.company = 'Name of your company is required';
    } else if (!values.type) {
        errors.type = 'Type of business is required';
    } else if (!values.description) {
        errors.description = 'Please give us a short description of your business';
    } else if (!values.employees) {
        errors.employees = 'Number of employees is required';
    } else if (!values.contact) {
        errors.contact = 'Contact number is required';
    }
    return errors;
}

@connect((store) => {
  return {
    profileInfo: store.onboard.profileInfo,
    updatedProfileInfo: store.onboard.updated
  };
})
export default class General extends React.Component {

    updateProfile(data) {
        this.props.dispatch(updateProfile(data));
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props:', nextProps);
        if (nextProps.updatedProfileInfo === true) {
            this.props.dispatch(push('/onboarding/invite'));
        }
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, errors } = this.props;

        return (
            <div>
                <div class="row m-t-30 m-b-40">
                    <div class="col-sm-8 col-sm-offset-2">
                        <div class="white-box m-t-30">
                            <h3 class="box-title m-b-0">Please let us know a bit about you...</h3>
                            <p class="text-muted m-b-30 font-13">We can better tailor your experience</p>
                            <form className="form-horizontal" onSubmit={handleSubmit(this.updateProfile.bind(this))}> 
                                <Field name="company" type="text" component={renderField} placeholder="Company name" label="Name of company"/>
                                <Field name="type" type="select" component={renderField} label="Type of business"/>
                                <Field name="description" type="textarea" component={renderField} placeholder="Short description of your business" label="Description of business"/>
                                <Field name="employees" type="number" component={renderField} placeholder="10" label="Number of employees"/>
                                <Field name="contact" type="text" component={renderField} placeholder="+61415232743" label="Contact number"/>
                                <button type="submit" class="btn btn-info waves-effect waves-light m-r-10">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

General = reduxForm({  
  form: 'onboardForm',
  validate
})(General);