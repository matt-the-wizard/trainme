import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import { Typography } from '@material-ui/core';
import moment from 'moment';

const styles = theme => ({
});

const SessionList = (props) => {
    const { classes, sessions } = props;
    return (
        <div>
            <List className={classes.root}>
                {sessions.map((session) => (
                    <ListItem key={session.id}>
                        <ListItemText primary={moment(session.startTime, "HH:mm:ss").format("hh:mm A") + ' - ' +
                            moment(session.endTime, "HH:mm:ss").format("hh:mm A")} secondary={
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
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
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