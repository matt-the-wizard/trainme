import {
    getNewClientName,
} from "../selectors";

import {
    getToken
} from "../../security/selectors";

import {
    ADD_CLIENT_SUCCEEDED,
    ADD_CLIENT_FAILED,
    SEARCH_CLIENTS_SUCCEEDED,
    SEARCH_CLIENTS_FAILED,
    UPDATE_NEW_CLIENT_NAME,
    OPEN_NEW_CLIENT_MODAL,
    CLOSE_NEW_CLIENT_MODAL
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
                dispatch({type: CLOSE_NEW_CLIENT_MODAL});
            })
            .catch(error => {
                dispatch({type: ADD_CLIENT_FAILED, payload: "Error occurred adding this client" })
            });
    }
}

export function updateNewClientName(name='') {
    return { type: UPDATE_NEW_CLIENT_NAME, payload: name }
}

export function openNewClientModal() {
    return {type: OPEN_NEW_CLIENT_MODAL};
}

export function closeNewClientModal() {
    return {type: CLOSE_NEW_CLIENT_MODAL};
}