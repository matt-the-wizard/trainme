import {
	SEARCH_CLIENTS,
	LOGIN_USER,
	UPDATE_PASSWORD,
	UPDATE_USERNAME
} from '../actions';

export function searchClients() {
	return (dispatch, getState) => {
		const token = getState().token;
		fetch('/clients', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
				token: token,
			}
		}).then(response => response.json())
			.then(json => {
				dispatch({type: SEARCH_CLIENTS, payload: json.clients})
			})
			.catch(error => console.error(error)); // TODO: Dispatch fetch error
	}
}

export function loginUser(username, password) {
	return (dispatch, getState) => {
		fetch('/login', {
			method: 'POST',
			body: JSON.stringify({
				username: 'matt-the-wizard',
				password: 'supersecret'
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(response => response.json())
			.then(response => {
				dispatch({type: LOGIN_USER, payload: response.token})
			})
			.catch(error => console.error(error)); // TODO: Dispatch login error
	}
}

export function updateUsername(username='') {
	return { type: UPDATE_USERNAME, payload: username }
}

export function updatePassword(password='') {
	return { type: UPDATE_PASSWORD, payload: password }
}