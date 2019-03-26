import { Fragment } from 'react';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  formControl: {
    minWidth: 120,
    display: 'flex',
    width: '100%',
  },
  select: {
    flex: 1,
  },
});

const SessionForm = (props) => {
  const {
    classes,
    notes,
    location,
    clientId,
    clients,
    serviceId,
    services,
    onNotesChange,
    onLocationChange,
    onClientChange,
    onServicesChange,
  } = props;
  return (
    <Fragment>
      <div className={classes.form}>
        <div className={classes.formControl}>
          <Select
            className={classes.select}
            onChange={(evt) => onClientChange(evt, evt.target.value)}
            value={clientId}>
            {clients.map( (client) =>
              <MenuItem value={client.id + ''} key={client.id}>{client.name}</MenuItem>
            )}
          </Select>
        </div>
        <div className={classes.formControl}>
          <Select
            className={classes.select}
            onChange={(evt) => onServicesChange(evt, evt.target.value)}
            value={serviceId}>
            {services.map( (service) =>
              <MenuItem value={service.id + ''} key={service.id}>{service.title}</MenuItem>
            )}
          </Select>
        </div>
        <TextField label="Location" placeholder="Location" type="text" value={location} fullWidth
                   onChange={(evt) => onLocationChange(evt, evt.target.value)}/>
        <TextField multiline rows="3" rowsMax="5" label="Notes" placeholder="Notes" type="text" value={notes} fullWidth
                   onChange={(evt) => onNotesChange(evt, evt.target.value)}/>
      </div>
    </Fragment>
  )
};

SessionForm.propTypes = {
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
  onServicesChange: PropTypes.func.isRequired,
};

SessionForm.defaultProps ={
  notes: '',
  location: '',
  clientId: '',
  clients: [],
  serviceId: '',
  services: [],
};

export default withStyles(styles)(SessionForm);