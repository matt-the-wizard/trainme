import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ClientList = (props) => (
	<div>
		<List>
			{props.clients.map((client, index) => (
				<ListItem button key={index}>
					<ListItemText>{client.name}</ListItemText>
				</ListItem>
			))}
		</List>
	</div>
);

ClientList.propTypes = {
	clients: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	})),
}

ClientList.defaultProps = {
	clients: [],
}

export default ClientList;