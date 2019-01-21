import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
});

const LoginForm = (props) => {
	const { classes, username, password, onUsernameChange, onPasswordChange, onLogin } = props;
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<div className={classes.form}>
					<TextField placeholder="username" type="text" value={username} fullWidth
							   onChange={(evt) => onUsernameChange(evt, evt.target.value)}/>
					<TextField placeholder="password" type="password" value={password} fullWidth
							   onChange={(evt) => onPasswordChange(evt, evt.target.value)}/>
					<Button className={classes.submit} variant={"contained"} color="primary" onClick={(evt) => onLogin(evt, username, password)}>Login</Button>
				</div>
			</Paper>
		</main>
	)
};

LoginForm.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	onLogin: PropTypes.func.isRequired,
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};

LoginForm.defaultProps = {
	username: '',
	password: '',
};

export default withStyles(styles)(LoginForm);