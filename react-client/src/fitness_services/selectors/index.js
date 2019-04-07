import { createSelector } from 'reselect';

export const getServices = state => state.SERVICES.services;
export const getServicesWithTitleSortKey = createSelector([getServices], services => Object.values(services)
    .map(service => ({
        ...service,
        sortKey: service.title.toLowerCase()
    })));

export const getServicesOrderedByTitle = createSelector(
    [getServicesWithTitleSortKey],
    (services) => services
        .sort((first, second) => {
            if (first.sortKey > second.sortKey)
                return 1;
            if (first.sortKey < second.sortKey)
                return -1;
            return 0;
        })
);

export const getErrorMessage = state => state.SERVICES.errorMessage;
export const showErrorMessage = createSelector([getErrorMessage], (message) => Boolean(message));
export const getServiceId = state => state.SERVICES.service.id;
export const getServiceTitle = state => state.SERVICES.service.title;
export const getServiceDuration = state => state.SERVICES.service.duration;
export const getServiceModalOpen = state => state.SERVICES.serviceModalOpen;
export const getArchiveModalOpen = state => state.SERVICES.archiveModalOpen;