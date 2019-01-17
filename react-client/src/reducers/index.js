import {
	SEARCH_CLIENTS_SUCCEEDED,
	LOGIN_USER_SUCCESS,
	UPDATE_USERNAME,
	UPDATE_PASSWORD, LOGIN_USER_FAILED, SEARCH_CLIENTS_FAILED, NULLIFY_TOKEN
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
				clientsOrder: action.payload.sort((first, second) => {
					if (first.name > second.name)
						return 1;
					if (first.name < second.name)
						return -1;
					return 0;
				}).map((value) => value.id),
				errorMessage: null,
			};
		case SEARCH_CLIENTS_FAILED:
			return {
				...state,
				clients: [],
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
		default:
			return state;
	}
}