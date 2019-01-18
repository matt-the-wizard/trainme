import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientsPage from './ClientsPage';
import LoginFormPage from "./LoginFormPage";
import PrivateRoute from '../components/PrivateRoute';

import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme({
	palette: {
		primary: orange,
		secondary: green,
	},
	typography: {
		useNextVariants: true,
	},
});

const styles = theme => ({
	appBar: {
	},
});

const App = (props) => {
	const { classes } = props;
	return (
		<Router>
			<Fragment>
				<MuiThemeProvider theme={theme}>
					<CssBaseline/>
					<AppBar position="static" className={classes.appBar}>
						<Toolbar>
							<IconButton color="inherit" aria-label="Menu">
								<MenuIcon/>
							</IconButton>
							<Typography variant="h5" color="inherit">
								#train-me
							</Typography>
						</Toolbar>
					</AppBar>
					<Route path="/login" component={LoginFormPage}/>
					<PrivateRoute path="/" component={ClientsPage}/>
				</MuiThemeProvider>
			</Fragment>
		</Router>
	)
};

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);