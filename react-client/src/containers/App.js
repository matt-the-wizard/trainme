import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientsPage from './ClientsPage';
import LoginForm from '../components/LoginForm';
import PrivateRoute from '../components/PrivateRoute';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import orange from '@material-ui/core/colors/orange';

const theme = createMuiTheme({
	palette: {
		primary: orange,
	},
	typography: {
		useNextVariants: true,
	},
});

const App = ()=> (
	<Router>
		<Fragment>
			<MuiThemeProvider theme={theme}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="h5" color="inherit">
							Train Me
						</Typography>
					</Toolbar>
				</AppBar>
				<Route path="/login" component={LoginForm} />
				<PrivateRoute path="/" component={ClientsPage} />
			</MuiThemeProvider>
		</Fragment>
	</Router>
);
export default App;