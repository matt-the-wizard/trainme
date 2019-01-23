import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Fab from '@material-ui/core/Fab';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import Mailto from 'react-protected-mailto';
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
		backgroundColor: theme.palette.primary.main,
	},
	edit: {
		backgroundColor: theme.palette.secondary.main,
	},
	delete: {
		backgroundColor: red,
	}
});

const ClientList = (props) => {
	const { classes, showTitle, updateClient } = props;
	return (
		<div>
			{showTitle && <Typography variant="h5" gutterBottom>Clients</Typography>}
			<List className={classes.root}>
				<ListItem key='list-actions'>
					{props.children}
				</ListItem>
				{props.clients.map((client) => (
					<ListItem key={client.id}>
						<Fab className={classes.avatar}>
							<PersonIcon />
						</Fab>
						<ListItemText primary={client.name} secondary={
							<React.Fragment>
								<Typography component="span" className={classes.inline} color="textPrimary">
									Phone: <Mailto tel={client.phone} />
								</Typography>
								<br />
								<Typography component="span" className={classes.inline} color="textPrimary">
									Email: <Mailto email={client.email} headers={
										{subject: 'Train Me'}
									} />
								</Typography>
							</React.Fragment>
						} />
						<Fab className={classes.edit} onClick={updateClient}>
							<EditIcon />
						</Fab>
						<Fab className={classes.delete}>
							<DeleteIcon />
						</Fab>
					</ListItem>
				))}
			</List>
		</div>
	);
};

ClientList.propTypes = {
	clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		phone: PropTypes.string.isRequired,
	})),
	classes: PropTypes.object.isRequired,
	showTitle: PropTypes.bool,
	updateClient: PropTypes.func.isRequired,
};

ClientList.defaultProps = {
	clients: [],
	classes: {},
	showTitle: true,
	updateClient: () => {},
};

export default withStyles(styles)(ClientList);