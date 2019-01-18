import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { connect } from 'react-redux';
import { getUsername, getPassword, getIsAuthenticated } from '../selectors';
import { loginUser, updateUsername, updatePassword } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

class LoginFormPage extends Component {
    render() {
        const { username, password, isAuthenticated, onLogin, onPasswordChange, onUsernameChange } = this.props;
        return (
            isAuthenticated ?
                <Redirect to='/' /> :
                <LoginForm username={username}
                           password={password}
                           onLogin={onLogin}
                           onUsernameChange={onUsernameChange}
                           onPasswordChange={onPasswordChange}
                           isAuthenticated={isAuthenticated}/>
        )
    }
}

LoginFormPage.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onUsernameChange: PropTypes.func.isRequired,
    onPasswordChange: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

LoginFormPage.defaultProps = {
    username: '',
    password: '',
};

const mapStateToProps = (state) => {
    return {
        username: getUsername(state),
        password: getPassword(state),
        isAuthenticated: getIsAuthenticated(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ loginUser, updateUsername, updatePassword }, dispatch);
};

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
)(LoginFormPage);