import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from 'react-router-redux';


//import the reducers
import auth from "./authReducer";
import onboard from "./onboardReducer";

export default combineReducers({
    auth,
    onboard,
    form: formReducer,
    routing: routerReducer
});