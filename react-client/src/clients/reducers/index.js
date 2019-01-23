import {
    SEARCH_CLIENTS_SUCCEEDED,
    SEARCH_CLIENTS_FAILED,
    ADD_CLIENT_SUCCEEDED,
    ADD_CLIENT_FAILED,
    OPEN_CLIENT_MODAL,
    CLOSE_CLIENT_MODAL,
    UPDATE_CLIENT_NAME,
    UPDATE_CLIENT_EMAIL,
    UPDATE_CLIENT_PHONE
} from '../actions';

export default function(state = {
    clients: {},
    client: {},
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
                client: {
                    name: '',
                    email: '',
                    phone: '',
                },
                clientModalOpen: false,
            };
        case ADD_CLIENT_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case UPDATE_CLIENT_NAME:
            return {
                ...state,
                client: {
                    ...state.client,
                    name: action.payload,
                },
            };
        case UPDATE_CLIENT_PHONE:
            return {
                ...state,
                client: {
                    ...state.client,
                    phone: action.payload,
                },
            };
        case UPDATE_CLIENT_EMAIL:
            return {
                ...state,
                client: {
                    ...state.client,
                    email: action.payload,
                },
            };
        case OPEN_CLIENT_MODAL:
            if (Boolean(action.payload)) {
                const client = action.payload;
                return {
                    ...state,
                    client: {
                        name: client.name,
                        email: client.email,
                        phone: client.phone,
                        id: client.id,
                    },
                    clientModalOpen: true,
                };
            }
            else {
                return {
                    ...state,
                    client: {},
                    clientModalOpen: true,
                };
            }
        case CLOSE_CLIENT_MODAL:
            return {
                ...state,
                clientModalOpen: false,
                client: {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                },
            };
        default:
            return state;
    }
}