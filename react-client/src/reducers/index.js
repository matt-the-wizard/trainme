import {
	SEARCH_CLIENTS,
	LOGIN_USER,
	UPDATE_USERNAME,
	UPDATE_PASSWORD
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
				}).map((value) => value.id)
			};
		case UPDATE_USERNAME:
			console.log(action);
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
			return {
				...state,
				token: action.payload,
			};
		default:
			return state;
	}
}