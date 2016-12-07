import React from "react";
import { push } from 'react-router-redux';


export default class Nav extends React.Component {

    render() {
        return (
            <nav class="navbar navbar-default navbar-static-top m-b-0">
                <div class="navbar-header"> 
                     <ul class="nav navbar-top-links navbar-right pull-right">  
                        <li>
                            <a class="dropdown-toggle waves-effect waves-light" href="#">Logout<i class="icon-options-vertical"></i></a>
                        </li>
                     </ul>
                </div>
            </nav>
        )
    }
}