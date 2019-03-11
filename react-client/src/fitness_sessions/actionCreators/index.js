import {
    getToken
} from "../../security/selectors";

// import { getClientId } from '../../clients/selectors';

import {
    SEARCH_DAY,
    SEARCH_SESSIONS_FAILED,
    SEARCH_SESSIONS_SUCCEEDED,
    OPEN_SESSION_MODAL,
    CLOSE_SESSION_MODAL,
    UPDATE_DAY_SELECTION,
}
from '../actions';

export function searchSessions(day, updateDaySelection=false) {
    return (dispatch, getState) => {
        dispatch({type: SEARCH_DAY, payload: day});
        if (updateDaySelection) {
            dispatch({
                type: UPDATE_DAY_SELECTION,
                payload: [
                  day,
                  day.clone().add(1, 'days'),
                  day.clone().add(2, 'days'),
                  day.clone().add(3, 'days'),
                  day.clone().add(4, 'days'),
                  day.clone().add(5, 'days'),
                  day.clone().add(6, 'days'),
                ]
            });
        }
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

export function openSessionModal(evt, fitnessSession) {
    return {type: OPEN_SESSION_MODAL, payload: fitnessSession};
}

export function closeSessionModal() {
    return {type: CLOSE_SESSION_MODAL};
}

// export function saveSession() {
//     return (dispatch, getState) => {
//         const token = getToken(getState());
//
//         const method = Boolean(sessionId) ? "PUT" : "POST";
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Token ${token}`,
//             token: token,
//         };
//         const body = JSON.stringify({
//             fitness_session: {
//                 client_id: null,
//                 service_id: null,
//                 day: null,
//                 start_time: null,
//                 end_time: null,
//                 notes: null,
//                 location: null
//             },
//         });
//
//         const url = Boolean(sessionId) ? `/coach_api/fitness_sessions/${sessionId}` : '/coach_api/fitness_sessions';
//
//         fetch(url, {
//             headers: headers,
//             body: body,
//             method: method,
//         }).then(response => response.json())
//           .then(json => {
//               dispatch({type: CLOSE_SESSION_MODAL});
//           })
//           .catch(error => {
//               dispatch({type: SAVE_CLIENT_FAILED, payload: "Error occurred adding this client" })
//           });
//     }
// }