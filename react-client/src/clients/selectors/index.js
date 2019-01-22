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

export const getNewClientModalOpen = state => state.CLIENTS.newClientModalOpen;

export const getNewClientName = state => state.CLIENTS.newClient.name;
export const getNewClientEmail = state => state.CLIENTS.newClient.email;
export const getNewClientPhone = state => state.CLIENTS.newClient.phone;