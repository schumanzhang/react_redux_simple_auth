import axios from "axios";

const baseEndpoint = window.location.host;
const devEndpoint = 'http://' + baseEndpoint + '/onboarding';

export function updateProfile(data) {
    //console.log('updateProfile', data);
    return function(dispatch) {
        dispatch({type: "UPDATE_PROFILE"});
        axios.post(devEndpoint + '/profile', data)
            .then((response) => {
                console.log('success', response);
                dispatch({type: "UPDATE_PROFILE_FULFILLED", payload: response.data})
            })
            .catch((err) => {
                console.log('failure', err);
                dispatch({type: "UPDATE_PROFILE_REJECTED", payload: err})
            })
    }
};