import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
  getErrorMessage,
  showErrorMessage,
  getServiceTitle,
  getServiceDuration,
  getServiceModalOpen,
} from '../selectors';

import {
  saveService,
  updateServiceDuration,
  updateServiceTitle,
  closeServiceModal
} from '../actionCreators';

import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import ServiceForm from '../components/ServiceForm';

class ServiceModal extends Component {
  render() {
    const {
      title,
      duration,
      onTitleChange,
      onDurationChange,
      onSubmit,
      onClose,
      open,
      showErrorMessage,
      errorMessage,
    } = this.props;

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Input Service Information</DialogTitle>
        <DialogContent>
          <ServiceForm title={title}
                       duration={duration}
                       onTitleChange={onTitleChange}
                       onDurationChange={onDurationChange}/>
          <br />
          {showErrorMessage &&
          <DialogContentText>
            {errorMessage}
          </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color="primary" onClick={onSubmit}>
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

ServiceModal.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.number,
  open: PropTypes.bool,
  onTitleChange: PropTypes.func.isRequired,
  onDurationChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  showErrorMessage: PropTypes.bool,
};

ServiceModal.defaultProps = {
  title: '',
  duration: 0,
  open: false,
  showErrorMessage: false,
};

const mapStateToProps = (state) => {
  return {
    title: getServiceTitle(state),
    duration: getServiceDuration(state),
    open: getServiceModalOpen(state),
    errorMessage: getErrorMessage(state),
    showErrorMessage: showErrorMessage(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updateServiceTitle,
    updateServiceDuration,
    saveService,
    closeServiceModal,
  }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
  ...props,
  ...stateProps,
  onTitleChange: (evt, name) => dispatchProps.updateServiceTitle(name),
  onDurationChange: (evt, email) => dispatchProps.updateServiceDuration(email),
  onSubmit: dispatchProps.saveService,
  onClose: dispatchProps.closeServiceModal,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ServiceModal);