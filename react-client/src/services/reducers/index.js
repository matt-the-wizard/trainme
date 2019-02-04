import {
    SEARCH_SERVICES_SUCCEEDED,
    SEARCH_SERVICES_FAILED,
}
from "../actions";

export default function(state = {
    services: {},
    errorMessage: '',
}, action) {
    switch (action.type) {
        case SEARCH_SERVICES_SUCCEEDED:
            return {
                ...state,
                services: action.payload.reduce((previous, current) => (
                    {...previous, [current.id]: current }
                ), {}),
                errorMessage: '',
            };
        case SEARCH_SERVICES_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}