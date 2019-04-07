import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
});

const ServiceForm = (props) => {
  const { classes, title, duration, onTitleChange, onDurationChange } = props;
  return (
    <Fragment>
      <div className={classes.form}>
        <TextField label="Title" placeholder="Boxing" type="text" value={title} fullWidth
                   onChange={(evt) => onTitleChange(evt, evt.target.value)}/>
        <TextField label="Duration (Minutes)" placeholder="30" type="number" value={duration} fullWidth
                   onChange={(evt) => onDurationChange(evt, evt.target.value)}/>
      </div>
    </Fragment>
  )
};

ServiceForm.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number,
  onTitleChange: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
};

ServiceForm.defaultProps = {
  title: '',
  duration: 0,
};

export default withStyles(styles)(ServiceForm);