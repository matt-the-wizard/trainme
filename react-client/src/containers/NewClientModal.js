import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getNewClientModalOpen, getNewClientName} from '../selectors';
import { addClient, updateNewClientName, closeNewClientModal } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ClientForm from '../components/ClientForm';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewClientModal extends Component {
    render() {
        const { name, onNameChange, onSubmit, onClose, open } = this.props;
        return (
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"New Client"}</DialogTitle>
                    <DialogContent>
                        <ClientForm name={name} onNameChange={onNameChange} />
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

NewClientModal.propTypes = {
    name: PropTypes.string,
    open: PropTypes.bool,
    onNameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

NewClientModal.defaultProps = {
    name: '',
    open: false,
};

const mapStateToProps = (state) => {
    return {
        name: getNewClientName(state),
        open: getNewClientModalOpen(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateNewClientName, addClient, closeNewClientModal }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
    ...props,
    ...stateProps,
    onNameChange: (evt, name) => dispatchProps.updateNewClientName(name),
    onSubmit: dispatchProps.addClient,
    onClose: dispatchProps.closeNewClientModal,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(NewClientModal);