import {
    SEARCH_SESSIONS_SUCCEEDED,
    SEARCH_SESSIONS_FAILED,
    SEARCH_DAY,
    OPEN_SESSION_MODAL,
    CLOSE_SESSION_MODAL,
    UPDATE_DAY_SELECTION,
    UPDATE_SESSION_CLIENT,
    UPDATE_SESSION_SERVICE,
    UPDATE_SESSION_NOTES,
    UPDATE_SESSION_LOCATION,
    UPDATE_SESSION_START_TIME,
    UPDATE_SESSION_END_TIME,
    SAVE_SESSION_SUCCEEDED,
}
    from '../actions';

export default function(state = {
    sessions: {},
    errorMessage: '',
    sessionModalOpen: false,
    days: [],
    selectedDay: null,
    session: {
        clientId: '',
        serviceId: '',
        day: null,
        startTime: new Date(),
        endTime: new Date(),
        notes: '',
        location: ''
    },
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
                            startTimeHour: current.start_time_hour,
                            startTimeMinutes: current.start_time_minutes,
                            startTimeMeridiem: current.start_time_meridiem,
                            endTimeHour: current.end_time_hour,
                            endTimeMinutes: current.end_time_minutes,
                            endTimeMeridiem: current.end_time_meridiem,
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
        case UPDATE_SESSION_CLIENT:
            return {
                ...state,
                session: {
                    ...state.session,
                    clientId: action.payload,
                },
            };
        case UPDATE_SESSION_SERVICE:
            return {
                ...state,
                session: {
                    ...state.session,
                    serviceId: action.payload,
                },
            };
        case UPDATE_SESSION_NOTES:
            return {
                ...state,
                session: {
                    ...state.session,
                    notes: action.payload,
                },
            };
        case UPDATE_SESSION_LOCATION:
            return {
                ...state,
                session: {
                    ...state.session,
                    location: action.payload,
                },
            };
        case UPDATE_SESSION_START_TIME:
            return {
                ...state,
                session: {
                    ...state.session,
                    startTime: action.payload,
                },
            };
        case UPDATE_SESSION_END_TIME:
            return {
                ...state,
                session: {
                    ...state.session,
                    endTime: action.payload,
                },
            };
        case SAVE_SESSION_SUCCEEDED:
            return {
              ...state,
                sessions: {
                    ...state.sessions,
                    [action.payload.id]: {
                        ...action.payload,
                        clientName: action.payload.client_name,
                        startTimeHour: action.payload.start_time_hour,
                        startTimeMinutes: action.payload.start_time_minutes,
                        startTimeMeridiem: action.payload.start_time_meridiem,
                        endTimeHour: action.payload.end_time_hour,
                        endTimeMinutes: action.payload.end_time_minutes,
                        endTimeMeridiem: action.payload.end_time_meridiem,
                        serviceTitle: action.payload.service_title,
                    },
                },
                session: {},
                sessionModalOpen: false,
                errorMessage: ''
            };
        default:
            return state;
    }
}