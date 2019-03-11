import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getClientsOrderedByName} from '../selectors';
import {searchClients, openClientModal, openArchiveModal} from '../actionCreators';
import ClientList from '../components/ClientList';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
	appBar: {
		top: 'auto',
		bottom: 0,
	},
	toolbar: {
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	addFabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
	},
});

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
	}

	render() {
		const { clients, classes, openClientModal, openArchiveModal } = this.props;
		return (
			<div>
				<Paper>
					<ClientList clients={clients} updateClient={openClientModal} deleteClient={openArchiveModal}/>
					<AppBar position="fixed" color="primary" className={classes.appBar}>
						<Toolbar className={classes.toolbar}>
							<Fab className={classes.addFabButton} color="secondary" aria-label="Add" onClick={openClientModal}><AddIcon /></Fab>
						</Toolbar>
					</AppBar>
				</Paper>
			</div>
    )
  }
}

ClientsPage.propTypes = {
	clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired
	})),
	searchClients: PropTypes.func.isRequired,
	openClientModal: PropTypes.func.isRequired,
	openArchiveModal: PropTypes.func.isRequired,
};

ClientsPage.defaultProps = {
	clients: [],
};

const mapStateToProps = (state) => {
	return {
		clients: getClientsOrderedByName(state),
	}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchClients, openClientModal, openArchiveModal}, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ClientsPage));