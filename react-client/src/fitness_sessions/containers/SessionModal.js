import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getSessionModalOpen} from '../selectors';
import { closeSessionModal } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class SessionModal extends Component {
  render() {
    const {
      onClose,
      open
    } = this.props;

    return (
      <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Fitness Session</DialogTitle>
        <DialogContent>
          TODO: Form goes here
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
};

SessionModal.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => {
  return {
    open: getSessionModalOpen(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeSessionModal,
  }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
  ...props,
  ...stateProps,
  onClose: dispatchProps.closeSessionModal,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SessionModal);