import axios from "axios";

const baseEndpoint = window.location.host;
const devEndpoint = 'http://' + baseEndpoint + '/auth';

export function login(data) {
    return function(dispatch) {
        dispatch({type: "AUTH_USER"});
        axios.post(devEndpoint + '/login', data)
            .then((response) => {
                dispatch({type: "AUTH_USER_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "AUTH_USER_REJECTED", payload: err})
            })
    }
};

export function register(data) {
    return function(dispatch) {
        dispatch({type: "REGISTER_USER"});
        axios.post(devEndpoint + '/register', data)
            .then((response) => {
                dispatch({type: "REGISTER_USER_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "REGISTER_USER_REJECTED", payload: err})
            })
    }
};

export function checkUser() {
    console.log('check current user...');
    return function(dispatch) {
        dispatch({type: "GET_USER"});
        axios.post(devEndpoint + '/checkUser')
            .then((response) => {
                dispatch({type: "GET_USER_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                dispatch({type: "GET_USER_REJECTED", payload: err})
            })
    }
};

export function logout() {

}

