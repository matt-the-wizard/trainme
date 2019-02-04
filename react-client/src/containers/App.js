import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ClientsPage from '../clients/containers/ClientsPage';
import ServicesPage from '../services/containers/ServicesPage';
import LoginFormPage from "../security/containers/LoginFormPage";
import PrivateRoute from '../security/components/PrivateRoute';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import AlarmIcon from '@material-ui/icons/Alarm';
import AssignmentIcon from '@material-ui/icons/Assignment';

const drawerWidth = 240;

const styles = theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 36,
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 7 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9 + 1,
		},
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
	},
});

class App extends Component {
	state = {
		open: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	render() {
		const { classes, theme } = this.props;
		const { open } = this.state;

		return (
			<Router>
				<div className={classes.root}>
					<AppBar
						position="fixed"
						className={classNames(classes.appBar, {
							[classes.appBarShift]: open,
						})}
					>
						<Toolbar disableGutters={!open}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, {
									[classes.hide]: open,
								})}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" noWrap>
								Train Me
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						className={classNames(classes.drawer, {
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						})}
						classes={{
							paper: classNames({
								[classes.drawerOpen]: open,
								[classes.drawerClose]: !open,
							}),
						}}
						open={this.state.open}
					>
						<div className={classes.toolbar}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />
						<List>
							<ListItem button key='clients-nav' component={Link} to="/clients">
								<ListItemIcon><PersonIcon/></ListItemIcon>
								<ListItemText primary='Clients' />
							</ListItem>
							<ListItem button key='services-nav' component={Link} to="/services">
								<ListItemIcon><AssignmentIcon/></ListItemIcon>
								<ListItemText primary='Services' />
							</ListItem>
							<ListItem button key='appointments-nav'>
								<ListItemIcon><AlarmIcon/></ListItemIcon>
								<ListItemText primary='Appointments' secondary='Coming Soon!' />
							</ListItem>
						</List>
					</Drawer>
					<main className={classes.content}>
						<div className={classes.toolbar} />
						<Switch>
							<Route exact path="/" component={LoginFormPage}/>
							<PrivateRoute path="/clients" component={ClientsPage}/>
							<PrivateRoute path="/services" component={ServicesPage}/>
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

App.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);