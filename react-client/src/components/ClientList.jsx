import React, {Component} from 'react';

class ClientList extends Component {
	constructor() {
		super();
		this.state = {
			clientList: [],
			clientListLoaded: false,
		}
	}

	componentDidMount() {
		fetch('/clients')
			.then(res => res.json)
			.then(res => {
				this.setState({
					clientList: res.clients,
					clientListLoaded: true
				})
			})
			.catch(error => console.error(error));
	}

	renderClients() {
		return this.state.clientList.map(client => {
			return (
				<div className="client" key={client.id}>
					<h1>{client.name}</h1>
				</div>
			)
		})
	}

	render() {
		return (
			<div className="client-list">
				{(this.state.clientListLoaded)
				? this.renderClients() : <p>Loading...</p>}
			</div>
		)
	}
}

export default ClientList;