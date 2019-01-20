import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getErrorMessage, showErrorMessage, getClientsOrderedByName} from '../selectors';
import { searchClients, toggleNewClientModal } from '../actionCreators';
import ClientList from '../components/ClientList';
import NewClientModal from './NewClientModal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
  	}

	render() {
		const { clients, showErrorMessage, errorMessage, toggleNewClientModal } = this.props;
		return (
			<div>
				{showErrorMessage ? errorMessage :
					<ClientList clients={clients}>
						<Fab size="small" color="secondary" aria-label="Add" onClick={() => toggleNewClientModal()}><AddIcon /></Fab>
						<NewClientModal />
					</ClientList>}
			</div>
    )
  }
}

ClientsPage.propTypes = {
	clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	})),
	searchClients: PropTypes.func.isRequired,
	toggleNewClientModal: PropTypes.func.isRequired,
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
  return bindActionCreators({searchClients, toggleNewClientModal}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);

