import React from 'react';
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { getUsername, getPassword, getIsAuthenticated } from '../selectors';
import { loginUser, updateUsername, updatePassword } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginForm = (props) => (
	props.isAuthenticated ?
		<Redirect to='/' /> :
		<div>
			<TextField placeholder="username" type="text" value={props.username} onChange={(evt) => props.onUsernameChange(evt, evt.target.value)} />
			<TextField placeholder="password" type="password" value={props.password} onChange={(evt) => props.onPasswordChange(evt, evt.target.value)} />
			<Button onClick={(evt) => props.onLogin(evt, props.username, props.password)} >Login</Button>
		</div>
);

LoginForm.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	onLogin: PropTypes.func.isRequired,
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
	username: '',
	password: '',
	onLogin: () => {},
	onUsernameChange: () => {},
	onPasswordChange: () => {},
};

const mapStateToProps = (state) => {
	return {
		username: getUsername(state),
		password: getPassword(state),
		isAuthenticated: getIsAuthenticated(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ loginUser, updateUsername, updatePassword }, dispatch);
}

const mergeProps = (stateProps, dispatchProps) => ({
	...stateProps,
	onLogin:(evt, ...rest) => dispatchProps.loginUser(...rest),
	onUsernameChange: (evt, username) => dispatchProps.updateUsername(username),
	onPasswordChange: (evt, password) => dispatchProps.updatePassword(password),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
)(LoginForm);