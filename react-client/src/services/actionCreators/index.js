import {
    getToken
} from "../../security/selectors";

import {
    SEARCH_SERVICES_SUCCEEDED,
    SEARCH_SERVICES_FAILED,
}
from "../actions";

export function searchServices() {
    return (dispatch, getState) => {
        const token = getToken(getState());
        fetch('/coach_api/services', {
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
                dispatch({type: SEARCH_SERVICES_FAILED, payload: "Unable to load services" })
            });
    }
}