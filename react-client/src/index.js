import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { createStore, applyMiddleware, compose } from './redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import ClientReducer from './clients/reducers';
import SecurityReducer from './security/reducers';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  combineReducers({
	  CLIENTS: ClientReducer,
	  SECURITY: SecurityReducer
  }), {}, compose(applyMiddleware(thunk)),
);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

serviceWorker.unregister();