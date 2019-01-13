import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getOrderedClients } from '../selectors';
import { searchClients } from '../actionCreators';
import ClientList from '../components/ClientList';

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
  }

	// componentDidUpdate() {
	// 	this.props.searchClients();
	// }

	render() {
		const { clients } = this.props;

		return (
			<ClientList clients={clients}/>
    )
  }
}

ClientsPage.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
  })),
  searchClients: PropTypes.func.isRequired
};

ClientsPage.defaultProps = {
  clients: [],
};

const mapStateToProps = (state) => {
	return {
		clients: getOrderedClients(state),
	}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchClients}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsPage);

