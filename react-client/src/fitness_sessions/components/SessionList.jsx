import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import { Typography } from '@material-ui/core';

const styles = () => ({
});

const SessionList = (props) => {
    const { classes, sessions } = props;
    return (
        <div>
            <List className={classes.root}>
                {sessions.map((session) => (
                    <ListItem key={session.id}>
                        <ListItemText primary={session.startTimeHour + ':' + session.startTimeMinutes + ' ' + session.startTimeMeridiem + ' - ' +
                            session.endTimeHour + ':' + session.endTimeMinutes + ' ' + session.endTimeMeridiem} secondary={
                            <React.Fragment>
                                <Typography component="span" color="textPrimary">
                                    {session.clientName} at {session.location} for {session.serviceTitle}
                                </Typography>
                            </React.Fragment>} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

SessionList.propTypes = {
    sessions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        startTimeHour: PropTypes.number.isRequired,
        startTimeMinutes: PropTypes.number.isRequired,
        startTimeMeridiem: PropTypes.string.isRequired,
        endTimeHour: PropTypes.number.isRequired,
        endTimeMinutes: PropTypes.number.isRequired,
        endTimeMeridiem: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        clientName: PropTypes.string.isRequired,
        serviceTitle: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        notes: PropTypes.string,
    })),
    classes: PropTypes.object.isRequired,
};

SessionList.defaultProps = {
    sessions: [],
    classes: {},
};

export default withStyles(styles)(SessionList);