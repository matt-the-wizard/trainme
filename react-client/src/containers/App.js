import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import ClientList from '../components/ClientList';
import {getOrderedClients, getErrorMessage, getToken, getUsername, getPassword} from '../selectors';
import {searchClients, loginUser, updateUsername, updatePassword} from '../actionCreators';
import {bindActionCreators} from 'redux';
import LoginForm from '../components/LoginForm';
import PrivateRoute from '../components/PrivateRoute';

class App extends Component {
	render() {
		let {
			username,
			password,
			loginUser,
			updateUsername,
			updatePassword,
			clients,
			errorMessage,
			token,
		} = this.props;

		return (
			<Router>
				<div>
					<Route path="/login" render={(props) =>
						<LoginForm {...props}
											 username={username}
											 password={password}
											 onLogin={loginUser}
											 onUsernameChange={updateUsername}
											 onPasswordChange={updatePassword}
						/>}
					/>
					<PrivateRoute path='/clients' isAuthenticated={token} render={(props) =>
						<ClientList {...props} clients={clients} />} />
					<p>{errorMessage}</p>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		clients: getOrderedClients(state),
		token: getToken(state),
		errorMessage: getErrorMessage(state),
		username: getUsername(state),
		password: getPassword(state),
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({searchClients, loginUser, updateUsername, updatePassword}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);