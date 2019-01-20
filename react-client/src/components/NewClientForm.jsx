import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

const NewClientForm = (props) => {
    const { classes, name, onNameChange, onSubmit } = props;
    return (
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
                <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Add Client
            </Typography>
            <div className={classes.form}>
                <TextField placeholder="name" type="text" value={name} fullWidth
                           onChange={(evt) => onNameChange(evt, evt.target.value)}/>
                <Button className={classes.submit} variant={"contained"} color="primary" onClick={(evt) => onSubmit(evt, name)}>Add</Button>
            </div>
        </Paper>
    )
};

NewClientForm.propTypes = {
    name: PropTypes.string,
    onNameChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

NewClientForm.defaultProps = {
    name: '',
};

export default withStyles(styles)(NewClientForm);