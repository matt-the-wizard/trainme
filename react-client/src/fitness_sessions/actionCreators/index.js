import {
    getToken
} from "../../security/selectors";

import {
    SEARCH_SESSIONS_FAILED,
    SEARCH_SESSIONS_SUCCEEDED,
}
from "../actions";

export function searchSessions() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        fetch('/coach_api/fitness_sessions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                token: token,
            }
        }).then(response => response.json())
            .then(json => {
                dispatch({type: SEARCH_SESSIONS_SUCCEEDED, payload: json.sessions})
            })
            .catch(error => {
                dispatch({type: SEARCH_SESSIONS_FAILED, payload: "Unable to load fitness sessions" })
            });
    }
}