import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getselectedDay, getDays, getSessionsOrderedByStartTime } from '../selectors';
import { openSessionModal, searchSessions } from '../actionCreators';
import SessionList from '../components/SessionList';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    title: {
        textAlign: 'center',
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        marginTop: '100px'
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addFabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
});

class CalendarPage extends Component {
    componentDidMount() {
        this.props.searchSessions(this.props.selectedDay, true);
    }

    render() {
        const { selectedDay, days, sessions, classes, searchSessions, openSessionModal } = this.props;
        const dayFormat = "D";
        const headerFormat = "dddd, MMM Do YYYY";
        return (
            <div>
                <Paper>
                    <Typography variant="h6" className={classes.title}>
                        {selectedDay.format(headerFormat)}
                    </Typography>
                    <Fab className={classes.fab} onClick={() => searchSessions(days[0].subtract(1, 'week').startOf('isoWeek'), true)}>
                        <ChevronLeftIcon />
                    </Fab>
                    {days.map( (day, index) => (
                        <Fab key={index} color={day.isSame(selectedDay, 'day') ? 'primary' : 'secondary'} className={classes.fab} onClick={() => searchSessions(day)}>
                            {day.format(dayFormat)}
                        </Fab>
                    ))}
                    <Fab className={classes.fab} onClick={() => searchSessions(days[6].add(1, 'week').startOf('isoWeek'), true)}>
                        <ChevronRightIcon />
                    </Fab>
                    <SessionList sessions={sessions} />
                    <AppBar position="fixed" color="primary" className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Fab className={classes.addFabButton} color="secondary" aria-label="Add" onClick={openSessionModal}><AddIcon /></Fab>
                        </Toolbar>
                    </AppBar>
                </Paper>
            </div>
        )
    }
}

CalendarPage.propTypes = {
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
    searchSessions: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired,
    days: PropTypes.arrayOf(PropTypes.instanceOf(moment)).isRequired,
    openSessionModal: PropTypes.func.isRequired,
};

CalendarPage.defaultProps = {
    classes: {},
};

const mapStateToProps = (state) => {
    return {
        sessions: getSessionsOrderedByStartTime(state),
        selectedDay: getselectedDay(state),
        days: getDays(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchSessions, openSessionModal}, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));