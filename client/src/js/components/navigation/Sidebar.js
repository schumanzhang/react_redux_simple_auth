import React from "react";
import { IndexLink, Link } from "react-router";


export default class Sidebar extends React.Component {

    componentWillMount() {
       console.log('sidebar props:', this.props);
    }

    render() {

        const { location } = this.props;

        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse slimscrollsidebar">
                    <ul className="nav" id="side-menu">
                        <li className="nav-small-cap m-t-10">--- Main Menu</li>
                        <li> <a className="waves-effect" activeClassName="active" onlyActiveOnIndex={true}>
                            <i className="linea-icon linea-basic fa-fw" data-icon="v"></i> 
                            <IndexLink to="/main">Dashboard</IndexLink></a>
                        </li>
                        <li> <a className="waves-effect" activeClassName="active">
                            <i className="linea-icon linea-basic fa-fw" data-icon="v"></i> 
                            <Link to="/main/clients">Clients</Link></a>
                        </li>
                        <li> <a className="waves-effect" activeClassName="active">
                            <i className="linea-icon linea-basic fa-fw" data-icon="v"></i> 
                            <Link to="/main/conference">Conference</Link></a>
                        </li>
                        <li> <a className="waves-effect" activeClassName="active">
                            <i className="linea-icon linea-basic fa-fw" data-icon="v"></i> 
                            <Link to="/main/schedule">Schedule</Link></a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

}