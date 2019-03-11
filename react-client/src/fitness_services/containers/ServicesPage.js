import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getServicesOrderedByTitle} from '../selectors';
import {searchServices} from '../actionCreators';
import ServiceList from '../components/ServiceList';
import Paper from '@material-ui/core/Paper';

class ServicesPage extends Component {
	componentDidMount() {
		this.props.searchServices();
  	}

	render() {
		const { services } = this.props;
		return (
			<div>
				<Paper>
					<ServiceList services={services}/>
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
  return bindActionCreators({searchServices}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesPage);