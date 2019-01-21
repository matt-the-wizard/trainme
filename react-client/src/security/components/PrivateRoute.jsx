import React from "react";
import {Redirect, Route} from "react-router-dom";
import { getIsAuthenticated } from '../selectors';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
	<Route {...rest} render={(props) => (isAuthenticated
			? <Component {...props} />
			: <Redirect to='/login' />
	)} />
);

const mapStateToProps = (state) => {
	return {
		isAuthenticated: getIsAuthenticated(state),
	}
}

export default connect(mapStateToProps)(PrivateRoute);