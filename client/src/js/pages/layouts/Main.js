import React from "react";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Footer from "../../components/navigation/Footer";
import Nav from "../../components/navigation/Nav";

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
        const { location } = this.props;
        return (
             <div>
             <div id="wrapper">
                <Nav location={location} />
                     <div id="page-wrapper">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                     </div>
                <Footer/>
            </div>
            </div>
        );
    }

}

