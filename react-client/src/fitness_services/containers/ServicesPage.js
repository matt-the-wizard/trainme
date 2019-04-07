import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getServicesOrderedByTitle} from '../selectors';
import {searchServices, openServiceModal, openArchiveModal} from '../actionCreators';
import ServiceList from '../components/ServiceList';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core';

const styles = () => ({
	addFabButton: {
		position: 'absolute',
		right: 8,
		top: 70,
	},
});

class ServicesPage extends Component {
	componentDidMount() {
		this.props.searchServices();
	}

	render() {
		const { services, openServiceModal, openArchiveModal, classes } = this.props;
		return (
			<div>
				<Paper>
					<ServiceList services={services} updateService={openServiceModal} deleteService={openArchiveModal}/>
					<Fab className={classes.addFabButton} color="secondary" aria-label="Add" onClick={openServiceModal}><AddIcon /></Fab>
				</Paper>
			</div>
    )
  }
}

ServicesPage.propTypes = {
	services: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
	})),
	searchServices: PropTypes.func.isRequired,
	openServiceModal: PropTypes.func.isRequired,
	openArchiveModal: PropTypes.func.isRequired,
};

ServicesPage.defaultProps = {
	services: [],
};

const mapStateToProps = (state) => {
	return {
		services: getServicesOrderedByTitle(state),
	}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({searchServices, openServiceModal, openArchiveModal}, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ServicesPage));