import { createSelector } from 'reselect';

export const getClients = state => state.clients;

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

export const getClientsOrderedByNameDesc = createSelector([getClientsWithNameSortKey],
	(clients) => clients
	.sort((first, second) => {
		if (first.sortKey < second.sortKey)
			return 1;
		if (first.sortKey > second.sortKey)
			return -1;
		return 0;
	})
);

export const getOrderedClients = createSelector();

export const getUsername = state => state.username;
export const getPassword = state => state.password;

export const getErrorMessage = state => state.errorMessage;
export const showErrorMessage = createSelector([getErrorMessage], (message) => Boolean(message));

export const getToken = state => state.token;
export const getIsAuthenticated = createSelector([getToken], (token) => Boolean(token));

export const getNewClientName = state => state.newClientName;
export const getNewClientModalOpen = state => state.newClientModalOpen;