import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from "@material-ui/core/es/Button/Button";

const ClientList = (props) => (
	<div>
		<h1>Clients</h1>
		<List>
			{props.clients.map((client, index) => (
				<ListItem button key={index}>
					<ListItemText>{client.name}</ListItemText>
				</ListItem>
			))}
		</List>
		<Button onClick={props.refresh}>Refresh</Button>
	</div>
);

ClientList.propTypes = {
	clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	})),
	refresh: PropTypes.func,
}

ClientList.defaultProps = {
	clients: [],
	refresh: () => {},
}

export default ClientList;