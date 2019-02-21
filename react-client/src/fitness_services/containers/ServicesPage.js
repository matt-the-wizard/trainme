import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getServicesOrderedByTitle} from '../selectors';
import {searchServices} from '../actionCreators';
import ServiceList from '../components/ServiceList';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class ServicesPage extends Component {
	componentDidMount() {
		this.props.searchServices();
  	}

	render() {
		const { services } = this.props;
		return (
			<div>
				<Paper>
					<ServiceList services={services}>
						<div style={{flexGrow: 1}}>
							<Grid container>
								<Grid item xs align='left'>
									{/*<Fab size="small" color="secondary" aria-label="Add"><AddIcon /></Fab>*/}
								</Grid>
								<Grid item xs align='center'>
									<Typography variant="h5" gutterBottom>Services</Typography>
								</Grid>
								<Grid item xs align='right'>
									&nbsp;
								</Grid>
							</Grid>
						</div>
					</ServiceList>
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