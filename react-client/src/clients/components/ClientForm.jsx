import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
});

const ClientForm = (props) => {
    const { classes, name, email, phone, onNameChange, onPhoneChange, onEmailChange } = props;
    return (
        <Fragment>
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            <div className={classes.form}>
                <TextField label="Name" placeholder="New Client" type="text" value={name} fullWidth
                           onChange={(evt) => onNameChange(evt, evt.target.value)}/>

                <TextField label="Email" placeholder="client@gmail.com" type="text" value={email} fullWidth
                           onChange={(evt) => onEmailChange(evt, evt.target.value)}/>

                <TextField label="Phone" placeholder="***-***-****" type="text" value={phone} fullWidth
                           onChange={(evt) => onPhoneChange(evt, evt.target.value)}/>
            </div>
        </Fragment>
    )
};

ClientForm.propTypes = {
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    onNameChange: PropTypes.func.isRequired,
    onEmailChange: PropTypes.func.isRequired,
    onPhoneChange: PropTypes.func.isRequired,
};

ClientForm.defaultProps = {
    name: '',
    email: '',
    phone: ''
};

export default withStyles(styles)(ClientForm);