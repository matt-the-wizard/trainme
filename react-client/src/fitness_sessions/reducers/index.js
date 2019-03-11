import {
    SEARCH_SESSIONS_SUCCEEDED,
    SEARCH_SESSIONS_FAILED,
    SEARCH_DAY,
    OPEN_SESSION_MODAL,
    CLOSE_SESSION_MODAL, UPDATE_DAY_SELECTION,
}
    from '../actions';

export default function(state = {
    sessions: {},
    errorMessage: '',
    sessionModalOpen: false,
    days: [],
    selectedDay: null,
}, action) {
    switch (action.type) {
        case SEARCH_DAY:
            return {
                ...state,
                selectedDay: action.payload,
            };
        case UPDATE_DAY_SELECTION:
            return {
              ...state,
              days: action.payload,
            };
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
                            serviceTitle: current.service_title,
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
        case OPEN_SESSION_MODAL:
            return {
                ...state,
                sessionModalOpen: true,
            };
        case CLOSE_SESSION_MODAL:
            return {
                ...state,
                sessionModalOpen: false,
            };
        default:
            return state;
    }
}