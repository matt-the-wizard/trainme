import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getSessionClientId,
  getSessionLocation,
  getSessionModalOpen,
  getSessionNotes,
  getSessionServiceId,
}
  from '../selectors';

import {
  closeSessionModal,
  updateSessionLocation,
  updateSessionNotes,
  updateSessionClientId,
  updateSessionServiceId,
}
from '../actionCreators';

import {
  searchClients,
}
from '../../clients/actionCreators';

import {
  searchServices,
}
from '../../fitness_services/actionCreators';

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SessionForm from '../components/SessionForm';
import { getClientsOrderedByName } from '../../clients/selectors';
import { getServicesOrderedByTitle } from '../../fitness_services/selectors';

class SessionModal extends Component {
  componentDidMount() {
    this.props.searchClients();
    this.props.searchServices();
  }

  render() {
    const {
      onClose,
      open,
      notes,
      location,
      clientId,
      clients,
      serviceId,
      services,
      onLocationChange,
      onNotesChange,
      onClientChange,
      onServiceChange,
    } = this.props;

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Fitness Session</DialogTitle>
        <DialogContent>
          <SessionForm
            notes={notes}
            location={location}
            clientId={clientId}
            clients={clients}
            serviceId={serviceId}
            services={services}
            onClientChange={onClientChange}
            onServicesChange={onServiceChange}
            onLocationChange={onLocationChange}
            onNotesChange={onNotesChange} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color="primary" onClick={onClose}>
            Confirm
          </Button>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

SessionModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  notes: PropTypes.string,
  location: PropTypes.string,
  clientId: PropTypes.string,
  clients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })),
  serviceId: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })),
  onNotesChange: PropTypes.func.isRequired,
  onLocationChange: PropTypes.func.isRequired,
  onClientChange: PropTypes.func.isRequired,
  onServiceChange: PropTypes.func.isRequired,
  searchClients: PropTypes.func.isRequired,
  searchServices: PropTypes.func.isRequired,
};

SessionModal.defaultProps = {
  open: false,
  location: '',
  notes: '',
  clientId: '',
  clients: [],
  serviceId: '',
  services: [],
};

const mapStateToProps = (state) => {
  return {
    open: getSessionModalOpen(state),
    notes: getSessionNotes(state),
    location: getSessionLocation(state),
    clientId: getSessionClientId(state),
    clients: getClientsOrderedByName(state),
    serviceId: getSessionServiceId(state),
    services: getServicesOrderedByTitle(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeSessionModal,
    updateSessionClientId,
    updateSessionServiceId,
    updateSessionLocation,
    updateSessionNotes,
    searchClients,
    searchServices,
  }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
  ...props,
  ...stateProps,
  onClose: dispatchProps.closeSessionModal,
  onNotesChange: (evt, notes) => dispatchProps.updateSessionNotes(notes),
  onLocationChange: (evt, location) => dispatchProps.updateSessionLocation(location),
  onClientChange: (evt, clientId) => dispatchProps.updateSessionClientId(clientId),
  onServiceChange: (evt, serviceId) => dispatchProps.updateSessionServiceId(serviceId),
  searchClients: dispatchProps.searchClients,
  searchServices: dispatchProps.searchServices,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SessionModal);