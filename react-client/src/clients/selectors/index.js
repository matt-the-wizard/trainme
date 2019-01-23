import { createSelector } from 'reselect';

export const getClients = state => state.CLIENTS.clients;

export const getClientsWithNameSortKey = createSelector([getClients], clients => Object.values(clients)
    .map(client => ({
        ...client,
        sortKey: client.name.toLowerCase()
    })));

export const getClientsOrderedByName = createSelector(
    [getClientsWithNameSortKey],
    (clients) => clients
        .sort((first, second) => {
            if (first.sortKey > second.sortKey)
                return 1;
            if (first.sortKey < second.sortKey)
                return -1;
            return 0;
        })
);

export const getErrorMessage = state => state.CLIENTS.errorMessage;
export const showErrorMessage = createSelector([getErrorMessage], (message) => Boolean(message));

export const getClientModalOpen = state => state.CLIENTS.clientModalOpen;

export const getClientName = state => state.CLIENTS.client.name;
export const getClientEmail = state => state.CLIENTS.client.email;
export const getClientPhone = state => state.CLIENTS.client.phone;
export const getClientId = state => state.CLIENTS.client.id;

export const getArchiveModalOpen = state => state.CLIENTS.archiveModalOpen;