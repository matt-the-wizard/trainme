import { createSelector } from 'reselect';

const getClients = state => state.clients;
const getClientsOrder = state => state.clientsOrder;

export const getOrderedClients = createSelector(
	[getClients, getClientsOrder],
	(clients, clientsOrder) => clientsOrder
		.map((key) => ({
			...clients[key],
			id: key,
			name: clients[key].name
		}))
);

export const getUsername = state => state.username;
export const getPassword = state => state.password;
export const getErrorMessage = state => state.errorMessage;
export const getToken = state => state.token;

export const getIsAuthenticated = createSelector([getToken], (token) => Boolean(token));