import React from "react";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Footer from "../../components/navigation/Footer";
import Nav from "../../components/navigation/Nav";

import { checkUser } from '../../actions/authActions';

@connect((store) => {
  return {
    user: store.auth.user
  };
})
export default class Onboarding extends React.Component {

    componentWillMount() {
        //check if onboarded or not, either go to onboarding or main
        if (this.props.user.profile.length !== 0) {
            this.props.dispatch(push('/main'));
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const { location } = this.props;

        return (
            <div>
            <div id="wrapper">
                <Nav location={location}/>
                    {this.props.childRoutes}
                <Footer/>
            </div>
            </div>
        );
    }

}