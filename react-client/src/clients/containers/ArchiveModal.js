import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getErrorMessage, showErrorMessage, getArchiveModalOpen, getClientName} from '../selectors';
import { archiveClient, closeArchiveModal, } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ArchiveModal extends Component {
    render() {
        const {
            onSubmit,
            onClose,
            open,
            showErrorMessage,
            errorMessage,
            name,
        } = this.props;

        return (
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Archive {name}</DialogTitle>
                <DialogContent>
                    You are going to archive {name} and they will no longer be accessible unless reached out to by an administrator.
                    Are you sure you want to continue?
                    <br />{showErrorMessage && errorMessage}
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
    name: PropTypes.string.isRequired,
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
        name: getClientName(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        archiveClient,
        closeArchiveModal,
    }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
    ...props,
    ...stateProps,
    onSubmit: dispatchProps.archiveClient,
    onClose: dispatchProps.closeArchiveModal,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ArchiveModal);