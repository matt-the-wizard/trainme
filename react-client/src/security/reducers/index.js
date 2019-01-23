import {
    LOGIN_USER_SUCCESS,
    UPDATE_USERNAME,
    UPDATE_PASSWORD,
    LOGIN_USER_FAILED,
    NULLIFY_TOKEN,
} from '../actions';

export default function(state = {
    token: '',
}, action) {
    switch (action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.payload,
            };
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                password: '',
                token: action.payload
            };
        case LOGIN_USER_FAILED:
            return {
                ...state,
                password: '',
                errorMessage: action.payload,
            };
        case NULLIFY_TOKEN:
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
}