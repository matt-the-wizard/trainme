import {
    SEARCH_SERVICES_SUCCEEDED,
    SEARCH_SERVICES_FAILED,
    CLOSE_ARCHIVE_MODAL,
    CLOSE_SERVICE_MODAL,
    OPEN_ARCHIVE_MODAL,
    OPEN_SERVICE_MODAL,
    ARCHIVE_SERVICE_FAILED,
    ARCHIVE_SERVICE_SUCCEEDED,
    UPDATE_SERVICE_TITLE,
    UPDATE_SERVICE_DURATION,
    SAVE_SERVICE_SUCCEEDED,
    SAVE_SERVICE_FAILED,
}
from '../actions';

export default function(state = {
    services: {},
    service: {
        id: '',
        title: '',
        duration: 0,
    },
    serviceModalOpen: false,
    archiveModalOpen: false,
    errorMessage: '',
}, action) {
    switch (action.type) {
        case SEARCH_SERVICES_SUCCEEDED:
            return {
                ...state,
                services: action.payload.reduce((previous, current) => (
                    {...previous, [current.id]: current }
                ), {}),
                errorMessage: '',
            };
        case SEARCH_SERVICES_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case SAVE_SERVICE_SUCCEEDED:
            return {
                ...state,
                services: {
                    ...state.services,
                    [action.payload.id]: action.payload,
                },
                service: {},
                serviceModalOpen: false,
                errorMessage: ''
            };
        case SAVE_SERVICE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case UPDATE_SERVICE_TITLE:
            return {
                ...state,
                service: {
                    ...state.service,
                    title: action.payload,
                },
            };
        case UPDATE_SERVICE_DURATION:
            return {
              ...state,
              service: {
                  ...state.service,
                  duration: action.payload,
              }
            };
        case OPEN_SERVICE_MODAL:
            if (Boolean(action.payload)) {
                const service = action.payload;
                return {
                    ...state,
                    service: {
                        ...state.service,
                        id: service.id,
                        title: service.title,
                        duration: service.duration,
                    },
                    serviceModalOpen: true,
                };
            }
            else {
                return {
                    ...state,
                    service: {},
                    serviceModalOpen: true,
                };
            }
        case CLOSE_SERVICE_MODAL:
            return {
                ...state,
                serviceModalOpen: false,
                service: {},
                errorMessage: ''
            };
        case OPEN_ARCHIVE_MODAL:
            return {
                ...state,
                service: {
                    ...state.service,
                    id: action.payload.id,
                    title: action.payload.title,
                },
                archiveModalOpen: true,
            };
        case CLOSE_ARCHIVE_MODAL:
            return {
                ...state,
                archiveModalOpen: false,
                service: {
                    ...state.service,
                    id: '',
                    title: '',
                },
                errorMessage: ''
            };
        case ARCHIVE_SERVICE_SUCCEEDED:
            let  {[action.payload.id]: deletedService, ...newServiceState} = state.services;
            return {
                services: newServiceState,
                archiveModalOpen: false,
                service: {
                    ...state.service,
                    id: '',
                    name: '',
                },
                errorMessage: ''
            };
        case ARCHIVE_SERVICE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
            };
        default:
            return state;
    }
}