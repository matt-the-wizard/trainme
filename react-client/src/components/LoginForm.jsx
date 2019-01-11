import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

const LoginForm = (props) => (
	<div>
		<FormControl>
			<Input placeholder="username" type="text" value={props.username} onChange={(evt) => props.onUsernameChange(evt.target.value)} />
			<Input placeholder="password" type="password" value={props.password} onChange={(evt) => props.onPasswordChange(evt.target.value)} />
			<Button onClick={(evt) => props.onLogin(props.username, props.password)} >Login</Button>
		</FormControl>
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
	onLogin: (username, password) => {},
	onUsernameChange: (value) => {},
	onPasswordChange: (value) => {},
};

export default LoginForm;