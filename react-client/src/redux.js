import {
  createStore,
  applyMiddleware,
  compose as originalCompose,
} from 'redux';
import { isProduction } from './env';

const composeEnhancers =
  (!isProduction() && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
  originalCompose;

export { createStore, applyMiddleware };
export const compose = composeEnhancers;
