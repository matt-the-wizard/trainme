import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { createStore, applyMiddleware, compose } from './redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import ClientReducer from './clients/reducers';
import SecurityReducer from './security/reducers';
import ServiceReducer from './services/reducers';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme} from "@material-ui/core";
import orange from "@material-ui/core/colors/orange";
import green from "@material-ui/core/colors/green";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = createStore(
  combineReducers({
	  CLIENTS: ClientReducer,
	  SECURITY: SecurityReducer,
      SERVICES: ServiceReducer,
  }), {}, compose(applyMiddleware(thunk)),
);

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: green,
    },
    typography: {
        useNextVariants: true,
    },
});

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Component />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

serviceWorker.unregister();