import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getErrorMessage, showErrorMessage, getOrderedClients} from '../selectors';
import { searchClients } from '../actionCreators';
import ClientList from '../components/ClientList';

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
  	}

	render() {
		const { clients, showErrorMessage, errorMessage } = this.props;
		return (
			showErrorMessage ? errorMessage : <ClientList clients={clients}/>
    )
  }
}

ClientsPage.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
  })),
  searchClients: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	showErrorMessage: PropTypes.bool.isRequired,
};

ClientsPage.defaultProps = {
  clients: [],
	errorMessage: '',
};

const mapStateToProps = (state) => {
	return {
		clients: getOrderedClients(state),
		errorMessage: getErrorMessage(state),
		showErrorMessage: showErrorMessage(state),
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchClients}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);

