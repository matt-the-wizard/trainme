import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import red from '@material-ui/core/colors/red';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
	list: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.primary.main,
	},
	edit: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	delete: {
		margin: theme.spacing.unit,
		backgroundColor: red["600"],
	}
});

const ServiceList = (props) => {
	const { classes, updateService, deleteService } = props;
	return (
		<div>
			<List className={classes.root}>
				<ListItem key='list-actions'>
					{props.children}
				</ListItem>
				{props.services.map((service) => (
					<ListItem key={service.id}>
						<ListItemText primary={service.title} secondary={service.duration + ' minutes'} />
						<Fab size='small' className={classes.edit} onClick={(evt) => updateService(evt, service)}>
							<EditIcon />
						</Fab>
						<Fab size='small' className={classes.delete} onClick={(evt) => deleteService(evt, service)}>
							<DeleteIcon />
						</Fab>
					</ListItem>
				))}
			</List>
		</div>
	);
};

ServiceList.propTypes = {
	services: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
	})),
	classes: PropTypes.object.isRequired,
	updateService: PropTypes.func.isRequired,
	deleteService: PropTypes.func.isRequired,
};

ServiceList.defaultProps = {
	services: [],
	classes: {},
};

export default withStyles(styles)(ServiceList);