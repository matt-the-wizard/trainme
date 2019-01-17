import {getToken} from "../selectors";
import {NULLIFY_TOKEN} from "../actions";
import {SEARCH_CLIENTS_SUCCEEDED} from "../actions";
import {SEARCH_CLIENTS_FAILED} from "../actions";
import {LOGIN_USER_SUCCESS} from "../actions";
import {LOGIN_USER_FAILED} from "../actions";
import {UPDATE_USERNAME} from "../actions";
import {UPDATE_PASSWORD} from "../actions";

export function searchClients() {
	return (dispatch, getState) => {
		const token = getToken(getState());
		fetch('/coach_api/clients', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
				token: token,
			}
		}).then(response => response.json())
		.then(json => {
			dispatch({type: SEARCH_CLIENTS_SUCCEEDED, payload: json.clients})
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
			dispatch({type: LOGIN_USER_SUCCESS, payload: response.token})
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