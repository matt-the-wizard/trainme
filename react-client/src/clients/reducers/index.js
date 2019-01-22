import {
    SEARCH_CLIENTS_SUCCEEDED,
    SEARCH_CLIENTS_FAILED,
    ADD_CLIENT_SUCCEEDED,
    ADD_CLIENT_FAILED,
    OPEN_NEW_CLIENT_MODAL,
    CLOSE_NEW_CLIENT_MODAL,
    UPDATE_NEW_CLIENT_NAME,
    UPDATE_NEW_CLIENT_EMAIL,
    UPDATE_NEW_CLIENT_PHONE
} from '../actions';

export default function(state = {
    clients: {},
    newClient: {},
}, action) {
    switch (action.type) {
        case SEARCH_CLIENTS_SUCCEEDED:
            return {
                ...state,
                clients: action.payload.reduce((previous, current) => (
                    {...previous, [current.id]: current }
                ), {}),
                errorMessage: null,
            };
        case SEARCH_CLIENTS_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case ADD_CLIENT_SUCCEEDED:
            return {
                ...state,
                clients: {
                    ...state.clients,
                    [action.payload.id]: action.payload,
                },
                newClient: {
                    name: '',
                    email: '',
                    phone: '',
                },
                newClientModalOpen: false,
            };
        case ADD_CLIENT_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case UPDATE_NEW_CLIENT_NAME:
            return {
                ...state,
                newClient: {
                    ...state.newClient,
                    name: action.payload,
                },
            };
        case UPDATE_NEW_CLIENT_PHONE:
            return {
                ...state,
                newClient: {
                    ...state.newClient,
                    phone: action.payload,
                },
            };
        case UPDATE_NEW_CLIENT_EMAIL:
            return {
                ...state,
                newClient: {
                    ...state.newClient,
                    email: action.payload,
                },
            };
        case OPEN_NEW_CLIENT_MODAL:
            return {
                ...state,
                newClientModalOpen: true,
            };
        case CLOSE_NEW_CLIENT_MODAL:
            return {
                ...state,
                newClientModalOpen: false,
                newClient: {
                    name: '',
                    email: '',
                    phone: '',
                },
            };
        default:
            return state;
    }
}