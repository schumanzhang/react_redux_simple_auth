import React from "react";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect((store) => {
  return {
    user: store.auth.user
  };
})
export default class Onboarding extends React.Component {

    componentWillMount() {
        //check if onboarded or not, either go to onboarding or main
        this.checkAuth();
    }

    checkAuth() {
        
    }





}