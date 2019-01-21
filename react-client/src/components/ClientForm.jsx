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
    const { classes, name, onNameChange } = props;
    return (
        <Fragment>
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            <div className={classes.form}>
                <TextField placeholder="name" type="text" value={name} fullWidth
                           onChange={(evt) => onNameChange(evt, evt.target.value)}/>
            </div>
        </Fragment>
    )
};

ClientForm.propTypes = {
    name: PropTypes.string,
    onNameChange: PropTypes.func.isRequired,
};

ClientForm.defaultProps = {
    name: '',
};

export default withStyles(styles)(ClientForm);