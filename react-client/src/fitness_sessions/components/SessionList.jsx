import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";

const styles = theme => ({
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

const SessionList = (props) => {
    const { classes, sessions } = props;
    return (
        <div>
            <List className={classes.root}>
                {sessions.map((session) => (
                    <ListItem key={session.id}>
                        <ListItemText primary={session.clientName + ' at ' + session.location} secondary={session.startTime + ' - ' + session.endTime} />
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
        day: PropTypes.instanceOf(Date).isRequired,
        clientName: PropTypes.string.isRequired,
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