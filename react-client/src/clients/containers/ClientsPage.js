import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getClientsOrderedByName} from '../selectors';
import { searchClients, openNewClientModal } from '../actionCreators';
import ClientList from '../components/ClientList';
import NewClientModal from './NewClientModal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ClientsPage extends Component {
	componentDidMount() {
		this.props.searchClients();
  	}

	render() {
		const { clients, onOpenNewClientModal } = this.props;
		return (
			<div>
				<Paper>
					<ClientList clients={clients}>
						<div style={{flexGrow: 1}}>
							<Grid container>
								<Grid item xs align='left'>
									<Fab size="small" color="secondary" aria-label="Add"  onClick={onOpenNewClientModal}><AddIcon /></Fab>
								</Grid>
								<Grid item xs align='center'>
									<Typography variant="h5" gutterBottom>Clients</Typography>
								</Grid>
								<Grid item xs align='right'>
									&nbsp;
								</Grid>
							</Grid>
						</div>
					</ClientList>
				</Paper>
				<NewClientModal />
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