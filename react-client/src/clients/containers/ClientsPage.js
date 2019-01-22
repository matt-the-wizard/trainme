import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getErrorMessage, showErrorMessage, getClientsOrderedByName} from '../selectors';
import { searchClients, openNewClientModal } from '../actionCreators';
import ClientList from '../components/ClientList';
import NewClientModal from './NewClientModal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
  	}

	render() {
		const { clients, showErrorMessage, errorMessage, onOpenNewClientModal } = this.props;
		return (
			<div>
				{showErrorMessage && errorMessage}
				<ClientList clients={clients}>
					<Fab size="small" color="secondary" aria-label="Add" onClick={onOpenNewClientModal}><AddIcon /></Fab>
					<NewClientModal />
				</ClientList>
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
	onOpenNewClientModal: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	showErrorMessage: PropTypes.bool.isRequired,
};

ClientsPage.defaultProps = {
	clients: [],
	errorMessage: '',
};

const mapStateToProps = (state) => {
	return {
		clients: getClientsOrderedByName(state),
		errorMessage: getErrorMessage(state),
		showErrorMessage: showErrorMessage(state),
	}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchClients, openNewClientModal}, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => {
	return {
		...props,
		...stateProps,
		...dispatchProps,
		onOpenNewClientModal: dispatchProps.openNewClientModal,
	}
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ClientsPage);