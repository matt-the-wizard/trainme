import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientsPage from './ClientsPage';
import LoginForm from '../components/LoginForm';
import PrivateRoute from '../components/PrivateRoute';

const App = ()=> (
	<Router>
		<Fragment>
			<Route path="/login" component={LoginForm} />
			<PrivateRoute path="/" component={ClientsPage} />
		</Fragment>
	</Router>
);
export default App;