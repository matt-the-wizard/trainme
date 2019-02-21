import {
    SEARCH_SESSIONS_SUCCEEDED,
    SEARCH_SESSIONS_FAILED,
}
    from "../actions";

export default function(state = {
    sessions: {},
    errorMessage: '',
}, action) {
    switch (action.type) {
        case SEARCH_SESSIONS_SUCCEEDED:
            return {
                ...state,
                sessions: action.payload.reduce((previous, current) => (
                    {
                        ...previous,
                        [current.id]: {
                            ...current,
                            clientName: current.client_name,
                            startTime: current.start_time,
                            endTime: current.end_time,
                        }
                    }
                ), {}),
                errorMessage: '',
            };
        case SEARCH_SESSIONS_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}