import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/es/Typography/Typography";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	icon: {
		fontSize: 20,
	},
});

const ClientList = (props) => {
	const { classes } = props;
	return (
		<div>
			<Paper className={classes.root}>
				<Typography variant="h6" align="center">
					Clients
					<div>{props.children}</div>
				</Typography>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>&nbsp;</TableCell>
							<TableCell>&nbsp;</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.clients.map((client) => (
							<TableRow key={client.id}>
								<TableCell component="th" scope="row">
									{client.name}
								</TableCell>
								<TableCell component="th" scope="row">
									{client.email}
								</TableCell>
								<TableCell component="th" scope="row">
									{client.phone}
								</TableCell>
								<TableCell component="th" scope="row">
									<Fab size="small" color="secondary" aria-label="Edit"><EditIcon /> TODO</Fab>
								</TableCell>
								<TableCell component="th" scope="row">
									<Fab size="small" color="secondary" aria-label="Delete"><DeleteIcon /> TODO</Fab>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
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
};

ClientList.defaultProps = {
	clients: [],
	classes: {}
};

export default withStyles(styles)(ClientList);