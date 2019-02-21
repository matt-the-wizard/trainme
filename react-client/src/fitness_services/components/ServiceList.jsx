import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import red from '@material-ui/core/colors/red';

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
	const { classes } = props;
	return (
		<div>
			<List className={classes.root}>
				<ListItem key='list-actions'>
					{props.children}
				</ListItem>
				{props.services.map((service) => (
					<ListItem key={service.id}>
						<ListItemText primary={service.title} secondary={service.duration + ' minutes'} />
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
};

ServiceList.defaultProps = {
	services: [],
	classes: {},
};

export default withStyles(styles)(ServiceList);