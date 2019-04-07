import {
    getToken
} from "../../security/selectors";

import {
    SEARCH_SERVICES_SUCCEEDED,
    SEARCH_SERVICES_FAILED,
    SAVE_SERVICE_SUCCEEDED,
    CLOSE_SERVICE_MODAL,
    SAVE_SERVICE_FAILED,
    ARCHIVE_SERVICE_SUCCEEDED,
    ARCHIVE_SERVICE_FAILED,
    UPDATE_SERVICE_TITLE,
    UPDATE_SERVICE_DURATION,
    OPEN_SERVICE_MODAL,
    CLOSE_ARCHIVE_MODAL,
    OPEN_ARCHIVE_MODAL
} from '../actions';

import {
    getServiceDuration,
    getServiceId,
    getServiceTitle
} from '../selectors';

export function searchServices() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        fetch('/coach_api/fitness_services', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                token: token,
            }
        }).then(response => response.json())
            .then(json => {
                dispatch({type: SEARCH_SERVICES_SUCCEEDED, payload: json.services})
            })
            .catch(error => {
                dispatch({type: SEARCH_SERVICES_FAILED, payload: "Unable to load fitness_services" })
            });
    }
}

export function saveService() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        const title = getServiceTitle(getState());
        const duration = getServiceDuration(getState());
        const serviceId = getServiceId(getState());

        const method = Boolean(serviceId) ? "PUT" : "POST";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            token: token,
        };
        const body = JSON.stringify({
            fitness_service: {
                id: serviceId,
                title: title,
                duration: duration
            },
        });
        const url = Boolean(serviceId) ? `/coach_api/fitness_services/${serviceId}` : '/coach_api/fitness_services';

        fetch(url, {
            headers: headers,
            body: body,
            method: method,
        }).then(response => response.json())
          .then(json => {
              dispatch({type: SAVE_SERVICE_SUCCEEDED, payload: json.service});
              dispatch({type: CLOSE_SERVICE_MODAL});
          })
          .catch(error => {
              dispatch({type: SAVE_SERVICE_FAILED, payload: "Error occurred saving this service" })
          });
    }
}

export function archiveService() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        const serviceId = getServiceId(getState());
        const method = "PUT";
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
            token: token,
        };
        const url = `/coach_api/fitness_services/${serviceId}/archive`;

        fetch(url, {
            headers: headers,
            method: method,
        }).then(response => response.json())
          .then(json => {
              dispatch({type: ARCHIVE_SERVICE_SUCCEEDED, payload: json.service});
          })
          .catch(error => {
              dispatch({type: ARCHIVE_SERVICE_FAILED, payload: "Error occurred archiving this service" })
          });
    }
}

export function updateServiceTitle(title='') {
    return { type: UPDATE_SERVICE_TITLE, payload: title }
}

export function updateServiceDuration(duration=0) {
    return { type: UPDATE_SERVICE_DURATION, payload: duration }
}

export function openServiceModal(evt, service) {
    return {type: OPEN_SERVICE_MODAL, payload: service};
}

export function closeServiceModal() {
    return {type: CLOSE_SERVICE_MODAL};
}

export function openArchiveModal(evt, service) {
    return {type: OPEN_ARCHIVE_MODAL, payload: service};
}

export function closeArchiveModal() {
    return {type: CLOSE_ARCHIVE_MODAL};
}