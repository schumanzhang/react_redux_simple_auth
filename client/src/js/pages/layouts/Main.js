import React from "react";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

@connect((store) => {
  return {
    user: store.auth.user,
    userFetched: store.auth.authenticated
  };
})
export default class Main extends React.Component {

    componentWillMount() {
        //this.checkAuth();
    }

    /*
    componentWillReceiveProps(nextProps) {
        if (nextProps.user === 0) {
            console.log('back to login', nextProps);
            this.props.dispatch(push('/login'));
        }
    }
    */

    checkAuth() {
        this.props.dispatch(checkUser());
    }

     render(){
        return (
         <div>
            <h1>This is the main app section</h1>
         </div>
        );
    }

}

