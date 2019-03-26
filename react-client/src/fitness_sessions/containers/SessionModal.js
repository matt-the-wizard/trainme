import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getSessionClientId,
  getSessionLocation,
  getSessionModalOpen,
  getSessionNotes,
  getSessionServiceId,
  getSessionStartTime,
  getSessionEndTime,
}
  from '../selectors';

import {
  closeSessionModal,
  updateSessionLocation,
  updateSessionNotes,
  updateSessionClientId,
  updateSessionServiceId,
  updateSessionStartTime,
  updateSessionEndTime,
  saveSession,
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
      saveSession,
      open,
      notes,
      location,
      startTime,
      endTime,
      clientId,
      clients,
      serviceId,
      services,
      onLocationChange,
      onNotesChange,
      onClientChange,
      onServiceChange,
      onStartTimeChange,
      onEndTimeChange,
    } = this.props;

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Fitness Session</DialogTitle>
        <DialogContent>
          <SessionForm
            notes={notes}
            location={location}
            startTime={startTime}
            endTime={endTime}
            clientId={clientId}
            clients={clients}
            serviceId={serviceId}
            services={services}
            onClientChange={onClientChange}
            onServicesChange={onServiceChange}
            onStartTimeChange={onStartTimeChange}
            onEndTimeChange={onEndTimeChange}
            onLocationChange={onLocationChange}
            onNotesChange={onNotesChange} />
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color="primary" onClick={saveSession}>
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
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
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
  onStartTimeChange: PropTypes.func.isRequired,
  onEndTimeChange: PropTypes.func.isRequired,
  searchClients: PropTypes.func.isRequired,
  searchServices: PropTypes.func.isRequired,
  saveSession: PropTypes.func.isRequired,
};

SessionModal.defaultProps = {
  open: false,
  location: '',
  notes: '',
  clientId: '',
  clients: [],
  serviceId: '',
  services: [],
  startTime: new Date(),
  endTime: new Date(),
};

const mapStateToProps = (state) => {
  return {
    open: getSessionModalOpen(state),
    notes: getSessionNotes(state),
    location: getSessionLocation(state),
    startTime: getSessionStartTime(state),
    endTime: getSessionEndTime(state),
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
    updateSessionStartTime,
    updateSessionEndTime,
    searchClients,
    searchServices,
    saveSession,
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
  onStartTimeChange: (startTime) => dispatchProps.updateSessionStartTime(startTime),
  onEndTimeChange: (endTime) => dispatchProps.updateSessionEndTime(endTime),
  searchClients: dispatchProps.searchClients,
  searchServices: dispatchProps.searchServices,
  saveSession: dispatchProps.saveSession,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SessionModal);