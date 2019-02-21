import {
    getToken
} from "../../security/selectors";

import {
    SEARCH_DAY,
    SEARCH_SESSIONS_FAILED,
    SEARCH_SESSIONS_SUCCEEDED,
}
    from '../actions';

export function searchSessions(day) {
    return (dispatch, getState) => {
        dispatch({type: SEARCH_DAY, payload: day});
        const token = getToken(getState());
        fetch('/coach_api/fitness_sessions?day=' + day.format("YYYY-MM-DD"), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                token: token,
            },
        }).then(response => response.json())
            .then(json => {
                dispatch({type: SEARCH_SESSIONS_SUCCEEDED, payload: json.sessions})
            })
            .catch(error => {
                dispatch({type: SEARCH_SESSIONS_FAILED, payload: "Unable to load fitness sessions" })
            });
    }
}