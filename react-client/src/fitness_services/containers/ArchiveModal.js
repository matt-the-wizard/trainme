import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getErrorMessage, showErrorMessage, getArchiveModalOpen, getServiceTitle } from '../selectors';
import { archiveService, closeArchiveModal, } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

class ArchiveModal extends Component {
  render() {
    const {
      onSubmit,
      onClose,
      open,
      showErrorMessage,
      errorMessage,
      title,
    } = this.props;

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Archive {title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to archive {title} and this service will no longer be accessible unless reached out to by an administrator.
            Are you sure you want to continue?
            <br />{showErrorMessage && errorMessage}
          </DialogContentText>
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

ArchiveModal.propTypes = {
  open: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

ArchiveModal.defaultProps = {
  open: false,
  name: '',
  showErrorMessage: false,
};

const mapStateToProps = (state) => {
  return {
    open: getArchiveModalOpen(state),
    errorMessage: getErrorMessage(state),
    showErrorMessage: showErrorMessage(state),
    title: getServiceTitle(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    archiveService,
    closeArchiveModal,
  }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
  ...props,
  ...stateProps,
  onSubmit: dispatchProps.archiveService,
  onClose: dispatchProps.closeArchiveModal,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ArchiveModal);