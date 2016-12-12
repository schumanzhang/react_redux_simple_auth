export default function reducer(state = {
    user: {},
    authenticated: false,
    isAuthenticating: false,
    sent: false,
    error: null
}, action) {

    switch (action.type) {
        case "REGISTER_USER": {
            return {...state, isAuthenticating: true }
        }
        case "REGISTER_USER_REJECTED": {
            //connect with the register screen and display the error
            return {...state, isAuthenticating: false, error: action.payload}
        }
        case "REGISTER_USER_FULFILLED": {
            //route to the main app section
            return {
                ...state,
                isAuthenticating: false,
                sent: true,
                authenticated: true,
                user: action.payload
            }
        }
        case "AUTH_USER": {
            return {...state, isAuthenticating: true }
        }
        case "AUTH_USER_REJECTED": {
            return {...state, isAuthenticating: false, error: action.payload}
        }
        case "AUTH_USER_FULFILLED": {
            return {
                ...state,
                isAuthenticating: false,
                sent: true,
                authenticated: true,
                user: action.payload
            }
        }
        case "GET_USER": {
            return {...state}
        }
        case "GET_USER_REJECTED": {
            return {...state, isAuthenticating: false, error: action.payload}
        }
        case "GET_USER_FULFILLED": {
            if(action.payload === 0){
                return {
                    ...state,
                    isAuthenticating: false,
                    sent: true,
                    authenticated: false,
                    user: action.payload
                }
            } else {
                return {
                    ...state,
                    isAuthenticating: false,
                    sent: true,
                    authenticated: true,
                    user: action.payload
                }
            }
        }
        case "LOGGING_OUT": {
            return {...state, authenticated: true }
        }
        case "LOGOUT_USER_REJECTED": {
            return {...state, authenticated: true, error: action.payload}
        }
        case "LOGOUT_USER_FULFILLED": {
            return {
                ...state,
                sent: true,
                authenticated: false,
                user: action.payload
            }
        }
    }

    return state;
};

