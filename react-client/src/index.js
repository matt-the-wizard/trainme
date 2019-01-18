import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { createStore, applyMiddleware, compose } from './redux';
import thunk from 'redux-thunk';
import Reducer from './reducers';
import * as serviceWorker from './serviceWorker';

const defaultState = {
  clients: {},
  clientsOrder: [],
  errorMessage: '',
  username: '',
  password: '',
  token: '',
};

const store = createStore(
  Reducer,
  defaultState,
  compose(applyMiddleware(thunk)),
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
