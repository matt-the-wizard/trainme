import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getNewClientModalOpen, getNewClientName, getNewClientEmail, getNewClientPhone, getErrorMessage, showErrorMessage} from '../selectors';
import { addClient, updateNewClientName, updateNewClientPhone, updateNewClientEmail, closeNewClientModal } from '../actionCreators';
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
        const { name, email, phone, onNameChange, onEmailChange, onPhoneChange, onSubmit, onClose, open, showErrorMessage, errorMessage } = this.props;
        return (
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"New Client"}</DialogTitle>
                    <DialogContent>
                        <ClientForm name={name} email={email} phone={phone}
                                    onNameChange={onNameChange} onEmailChange={onEmailChange} onPhoneChange={onPhoneChange} />
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

NewClientModal.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    open: PropTypes.bool,
    onNameChange: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPhoneChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    showErrorMessage: PropTypes.bool,
};

NewClientModal.defaultProps = {
    name: '',
    email: '',
    phone: '',
    open: false,
    showErrorMessage: false,
};

const mapStateToProps = (state) => {
    return {
        name: getNewClientName(state),
        email: getNewClientEmail(state),
        phone: getNewClientPhone(state),
        open: getNewClientModalOpen(state),
        errorMessage: getErrorMessage(state),
        showErrorMessage: showErrorMessage(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateNewClientName,
        updateNewClientPhone,
        updateNewClientEmail,
        addClient,
        closeNewClientModal,
    }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
    ...props,
    ...stateProps,
    onNameChange: (evt, name) => dispatchProps.updateNewClientName(name),
    onEmailChange: (evt, email) => dispatchProps.updateNewClientEmail(email),
    onPhoneChange: (evt, phone) => dispatchProps.updateNewClientPhone(phone),
    onSubmit: dispatchProps.addClient,
    onClose: dispatchProps.closeNewClientModal,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(NewClientModal);