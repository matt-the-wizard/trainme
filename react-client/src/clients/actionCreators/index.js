import {
    getClientEmail,
    getClientName,
    getClientPhone,
    getClientId,
} from "../selectors";

import {
    getToken
} from "../../security/selectors";

import {
    SAVE_CLIENT_SUCCEEDED,
    SAVE_CLIENT_FAILED,
    SEARCH_CLIENTS_SUCCEEDED,
    SEARCH_CLIENTS_FAILED,
    UPDATE_CLIENT_NAME,
    UPDATE_CLIENT_PHONE,
    UPDATE_CLIENT_EMAIL,
    OPEN_CLIENT_MODAL,
    OPEN_ARCHIVE_MODAL,
    CLOSE_CLIENT_MODAL,
    CLOSE_ARCHIVE_MODAL,
    ARCHIVE_CLIENT_SUCCEEDED,
    ARCHIVE_CLIENT_FAILED,
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

export function saveClient() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        const name = getClientName(getState());
        const email = getClientEmail(getState());
        const phone = getClientPhone(getState());
        const clientId = getClientId(getState());

        const method = Boolean(clientId) ? "PUT" : "POST";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            token: token,
        };
        const body = JSON.stringify({
            client: {
                id: clientId,
                name: name,
                email: email,
                phone: phone,
            },
        });

        const url = Boolean(clientId) ? `/coach_api/clients/${clientId}` : '/coach_api/clients';

        fetch(url, {
            headers: headers,
            body: body,
            method: method,
        }).then(response => response.json())
            .then(json => {
                dispatch({type: SAVE_CLIENT_SUCCEEDED, payload: json.client});
                dispatch({type: CLOSE_CLIENT_MODAL});
            })
            .catch(error => {
                dispatch({type: SAVE_CLIENT_FAILED, payload: "Error occurred adding this client" })
            });
    }
}

export function archiveClient() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        const clientId = getClientId(getState());
        const method = "PUT";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            token: token,
        };
        const url = `/coach_api/clients/${clientId}/archive`;

        fetch(url, {
            headers: headers,
            method: method,
        }).then(response => response.json())
            .then(json => {
                dispatch({type: ARCHIVE_CLIENT_SUCCEEDED, payload: json.client});
            })
            .catch(error => {
                dispatch({type: ARCHIVE_CLIENT_FAILED, payload: "Error occurred archiving this client" })
            });
    }
}

export function updateClientName(name='') {
    return { type: UPDATE_CLIENT_NAME, payload: name }
}

export function updateClientEmail(email='') {
    return { type: UPDATE_CLIENT_EMAIL, payload: email }
}

export function updateClientPhone(phone='') {
    return { type: UPDATE_CLIENT_PHONE, payload: phone }
}

export function openClientModal(evt, client) {
    return {type: OPEN_CLIENT_MODAL, payload: client};
}

export function closeClientModal() {
    return {type: CLOSE_CLIENT_MODAL};
}

export function openArchiveModal(evt, client) {
    return {type: OPEN_ARCHIVE_MODAL, payload: client};
}

export function closeArchiveModal() {
    return {type: CLOSE_ARCHIVE_MODAL};
}