import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    UPDATE_USERNAME,
    UPDATE_PASSWORD
}
from "../actions";

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