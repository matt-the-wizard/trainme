import React, { Fragment } from 'react';
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

const ClientList = (props) => {
	const { classes, updateClient, deleteClient } = props;
	return (
		<div>
			<List className={classes.root}>
				<ListItem key='list-actions'>
					{props.children}
				</ListItem>
				{props.clients.map((client) => (
					<ListItem key={client.id}>
						<Fragment>
						<Fab size='small' className={classes.avatar}>
							<PersonIcon />
						</Fab>
						</Fragment>
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
						}/>
						<Fab size='small' className={classes.edit} onClick={(evt) => updateClient(evt, client)}>
							<EditIcon />
						</Fab>
						<Fab size='small' className={classes.delete} onClick={(evt) => deleteClient(evt, client)}>
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
	updateClient: PropTypes.func.isRequired,
	deleteClient: PropTypes.func.isRequired,
	showEdit: PropTypes.bool,
	showDelete: PropTypes.bool,
};

ClientList.defaultProps = {
	clients: [],
	classes: {},
};

export default withStyles(styles)(ClientList);