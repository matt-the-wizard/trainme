import {
    getToken
}
from "../../security/selectors";

import {
  SEARCH_DAY,
  SEARCH_SESSIONS_FAILED,
  SEARCH_SESSIONS_SUCCEEDED,
  OPEN_SESSION_MODAL,
  CLOSE_SESSION_MODAL,
  UPDATE_DAY_SELECTION,
  UPDATE_SESSION_NOTES,
  UPDATE_SESSION_CLIENT,
  UPDATE_SESSION_END_TIME,
  UPDATE_SESSION_LOCATION,
  UPDATE_SESSION_SERVICE,
  UPDATE_SESSION_START_TIME, SAVE_SESSION_FAILED, SAVE_SESSION_SUCCEEDED,
}
  from '../actions';

import {
  getselectedDay,
  getSessionClientId,
  getSessionEndTime,
  getSessionLocation,
  getSessionNotes,
  getSessionServiceId,
  getSessionStartTime,
  getSessionId,
}
from '../selectors';

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

export function updateSessionNotes(notes='') {
  return { type: UPDATE_SESSION_NOTES, payload: notes }
}

export function updateSessionLocation(location='') {
  return { type: UPDATE_SESSION_LOCATION, payload: location }
}

export function updateSessionStartTime(startTime) {
  return { type: UPDATE_SESSION_START_TIME, payload: startTime }
}

export function updateSessionEndTime(endTime) {
  return { type: UPDATE_SESSION_END_TIME, payload: endTime }
}

export function updateSessionClientId(clientId='') {
  return { type: UPDATE_SESSION_CLIENT, payload: clientId }
}

export function updateSessionServiceId(serviceId='') {
  return { type: UPDATE_SESSION_SERVICE, payload: serviceId }
}

export function saveSession() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        const sessionId = getSessionId(getState());
        const clientId = getSessionClientId(getState());
        const serviceId = getSessionServiceId(getState());
        const day = getselectedDay(getState()).format("YYYY-MM-DD");
        const startTime = getSessionStartTime(getState());
        const endTime = getSessionEndTime(getState());
        const notes = getSessionNotes(getState());
        const location = getSessionLocation(getState());

        const method = Boolean(sessionId) ? "PUT" : "POST";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            token: token,
        };
        const startMeridiem = startTime.getHours() > 12 ? 'PM' : 'AM';
        const endMeridiem = endTime.getHours() > 12 ? 'PM' : 'AM';
        const startHour = startTime.getHours() > 12 ? startTime.getHours() - 12 : startTime.getHours();
        const endHour = endTime.getHours() > 12 ? endTime.getHours() - 12 : endTime.getHours();
        const body = JSON.stringify({
            fitness_session: {
                client_id: clientId,
                service_id: serviceId,
                day: day,
                start_time_hour: startHour,
                start_time_minutes: startTime.getMinutes(),
                start_time_meridiem: startMeridiem,
                end_time_hour: endHour,
                end_time_minutes: endTime.getMinutes(),
                end_time_meridiem: endMeridiem,
                notes: notes,
                location: location,
            },
        });
        const url = Boolean(sessionId) ? `/coach_api/fitness_sessions/${sessionId}` : '/coach_api/fitness_sessions';
        fetch(url, {
            headers: headers,
            body: body,
            method: method,
        }).then(response => response.json())
          .then(json => {
              dispatch({type: SAVE_SESSION_SUCCEEDED, payload: json.session});
          })
          .catch(error => {
              dispatch({type: SAVE_SESSION_FAILED, payload: "Error occurred saving this session"})
          });
    }
}