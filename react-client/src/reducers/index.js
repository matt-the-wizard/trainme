import {
	SEARCH_CLIENTS,
	LOGIN_USER,
	UPDATE_USERNAME,
	UPDATE_PASSWORD, LOGIN_USER_FAILED, SEARCH_CLIENTS_FAILED
} from '../actions';

export default function Reducer(state = {
	clientsOrder: [],
}, action) {
	switch (action.type) {
		case SEARCH_CLIENTS:
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
		case LOGIN_USER:
			localStorage.setItem('TOKEN', action.payload);
			return {
				...state,
				password: '',
				errorMessage: null
			};
		case LOGIN_USER_FAILED:
			localStorage.setItem('TOKEN', null);
			return {
				...state,
				errorMessage: action.payload,
			};
		default:
			return state;
	}
}