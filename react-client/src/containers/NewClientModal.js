import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getNewClientModalOpen, getNewClientName} from '../selectors';
import { addClient, updateNewClientName } from '../actionCreators';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import NewClientForm from '../components/NewClientForm';
import Modal from "@material-ui/core/es/Modal/Modal";

class NewClientModal extends Component {
    render() {
        const { name, onNameChange, onSubmit, open } = this.props;
        return (
            <Modal open={open} disableAutoFocus>
                <NewClientForm name={name} onNameChange={onNameChange} onSubmit={onSubmit} />
            </Modal>
        )
    }
}

NewClientModal.propTypes = {
    name: PropTypes.string,
    open: PropTypes.bool,
    onNameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
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
    return bindActionCreators({ updateNewClientName, addClient }, dispatch);
};

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    onNameChange: (evt, name) => dispatchProps.updateNewClientName(name),
    onSubmit: () => dispatchProps.addClient(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(NewClientModal);