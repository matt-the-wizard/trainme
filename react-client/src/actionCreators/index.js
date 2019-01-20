import {
	getToken,
	getNewClientName,
	getNewClientModalOpen,
} from "../selectors";

import {
	ADD_CLIENT_SUCCEEDED,
	ADD_CLIENT_FAILED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILED,
	SEARCH_CLIENTS_SUCCEEDED,
	SEARCH_CLIENTS_FAILED,
	UPDATE_USERNAME,
	UPDATE_PASSWORD,
	UPDATE_NEW_CLIENT_NAME,
	TOGGLE_NEW_CLIENT_MODAL
}
  from "../actions";

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

export function addClient() {
	return (dispatch, getState) => {
		const token = getToken(getState());
		const newClientName = getNewClientName(getState());
		fetch('/coach_api/clients', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Token ${token}`,
				token: token,
			},
			body: JSON.stringify({
				client: {
					name: newClientName,
				},
			}),
		}).then(response => response.json())
			.then(json => {
				dispatch({type: ADD_CLIENT_SUCCEEDED, payload: json.client});
				// Call searchClients()
			})
			.catch(error => {
				console.error(error);
				dispatch({type: ADD_CLIENT_FAILED, payload: "Error occurred adding this client" })
			});
	}
}

export function updateNewClientName(name='') {
	return { type: UPDATE_NEW_CLIENT_NAME, payload: name }
}

export function toggleNewClientModal() {
	return (dispatch, getState) => {
		const open = getNewClientModalOpen(getState());
		dispatch({type: TOGGLE_NEW_CLIENT_MODAL, payload: !open});
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