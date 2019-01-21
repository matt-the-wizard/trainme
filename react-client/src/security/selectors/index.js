import { createSelector } from 'reselect';

export const getUsername = state => state.SECURITY.username;
export const getPassword = state => state.SECURITY.password;

export const getErrorMessage = state => state.SECURITY.errorMessage;
export const showErrorMessage = createSelector([getErrorMessage], (message) => Boolean(message));

export const getToken = state => state.SECURITY.token;
export const getIsAuthenticated = createSelector([getToken], (token) => Boolean(token));