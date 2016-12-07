export default function reducer(state = {
    profileInfo: {},
    updated: false,
    updating: false,
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
    }
    return state;
};