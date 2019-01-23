import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getClientModalOpen, getClientName, getClientEmail, getClientPhone, getErrorMessage, showErrorMessage} from '../selectors';
import { saveClient, updateClientName, updateClientPhone, updateClientEmail, closeClientModal } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ClientForm from '../components/ClientForm';
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class ClientModal extends Component {
    render() {
        const {
            name,
            email,
            phone,
            onNameChange,
            onEmailChange,
            onPhoneChange,
            onSubmit,
            onClose,
            open,
            showErrorMessage,
            errorMessage,
        } = this.props;

        return (
            <Dialog open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Client</DialogTitle>
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

ClientModal.propTypes = {
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

ClientModal.defaultProps = {
    name: '',
    email: '',
    phone: '',
    open: false,
    showErrorMessage: false,
};

const mapStateToProps = (state) => {
    return {
        name: getClientName(state),
        email: getClientEmail(state),
        phone: getClientPhone(state),
        open: getClientModalOpen(state),
        errorMessage: getErrorMessage(state),
        showErrorMessage: showErrorMessage(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateClientName,
        updateClientPhone,
        updateClientEmail,
        saveClient,
        closeClientModal,
    }, dispatch);
};

const mergeProps = (stateProps, dispatchProps, props) => ({
    ...props,
    ...stateProps,
    onNameChange: (evt, name) => dispatchProps.updateClientName(name),
    onEmailChange: (evt, email) => dispatchProps.updateClientEmail(email),
    onPhoneChange: (evt, phone) => dispatchProps.updateClientPhone(phone),
    onSubmit: dispatchProps.saveClient,
    onClose: dispatchProps.closeClientModal,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(ClientModal);