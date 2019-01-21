import {
	SEARCH_CLIENTS_SUCCEEDED,
	LOGIN_USER_SUCCESS,
	UPDATE_USERNAME,
	UPDATE_PASSWORD,
	LOGIN_USER_FAILED,
	SEARCH_CLIENTS_FAILED,
	NULLIFY_TOKEN,
	ADD_CLIENT_SUCCEEDED,
	ADD_CLIENT_FAILED,
	OPEN_NEW_CLIENT_MODAL,
	CLOSE_NEW_CLIENT_MODAL,
	UPDATE_NEW_CLIENT_NAME
} from '../actions';

export default function Reducer(state = {
	clientsOrder: [],
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
		case ADD_CLIENT_SUCCEEDED:
			return {
				...state,
				clients: {
					...state.clients,
					[action.payload.id]: action.payload,
				},
				newClientName: '',
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
				newClientName: action.payload,
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
			};
		default:
			return state;
	}
}