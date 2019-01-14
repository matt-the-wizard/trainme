import {
	SEARCH_CLIENTS,
	LOGIN_USER,
	UPDATE_PASSWORD,
	UPDATE_USERNAME, LOGIN_USER_FAILED, SEARCH_CLIENTS_FAILED
} from '../actions';

import {getToken} from "../selectors";

export function searchClients() {
	return (dispatch) => {
		const token = getToken();
		fetch('/coach_api/clients', {
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
			.catch(error => {
				dispatch({type: SEARCH_CLIENTS_FAILED, payload: "Unable to load clients" })
			});
	}
}

export function loginUser(username, password) {
	return (dispatch) => {
		fetch('/coach_api/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				'Content-Type': 'application/json',
			}
		}).then(response => response.json())
			.then(response => {
				dispatch({type: LOGIN_USER, payload: response.token})
			})
			.catch(error => {
				dispatch({type: LOGIN_USER_FAILED, payload: "Invalid username and password" })
			});
	}
}

export function updateUsername(username='') {
	return { type: UPDATE_USERNAME, payload: username }
}

export function updatePassword(password='') {
	return { type: UPDATE_PASSWORD, payload: password }
}