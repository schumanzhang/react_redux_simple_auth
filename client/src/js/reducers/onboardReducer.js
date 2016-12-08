export default function reducer(state = {
    profileInfo: {},
    inviteClientInfo: {},
    updated: false,
    updating: false,
    invited: false,
    inviting: false,
    sent: false,
    error: null
}, action) {
    switch (action.type) {
        case "UPDATE_PROFILE": {
            return {...state, updating: true }
        }
        case "UPDATE_PROFILE_REJECTED": {
            return {...state, updating: false, error: action.payload}
        }
        case "UPDATE_PROFILE_FULFILLED": {
            return {
                ...state,
                updating: false,
                sent: true,
                updated: true,
                profileInfo: action.payload
            }
        }
        case "INVITE_CLIENT": {
            return {...state, inviting: true }
        }
        case "INVITE_CLIENT_REJECTED": {
            return {...state, inviting: false, error: action.payload}
        }
        case "INVITE_CLIENT_FULFILLED": {
            return {
                ...state,
                inviting: false,
                sent: true,
                invited: true,
                inviteClientInfo: action.payload
            }
        }
    }
    return state;
};