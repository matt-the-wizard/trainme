import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getselectedDay, getSessionsOrderedByStartTime } from '../selectors';
import {searchSessions} from '../actionCreators';
import SessionList from '../components/SessionList';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    title: {
        textAlign: 'center',
    },
});

class CalendarPage extends Component {
    componentDidMount() {
        this.props.searchSessions(moment());
    }

    render() {
        const { selectedDay, sessions, classes, searchSessions } = this.props;
        let previous = moment(selectedDay).subtract(1, 'day');
        const next = moment(selectedDay).add(1, 'day');
        const dayFormat = "D";
        const headerFormat = "dddd, MMM Do YYYY";
        return (
            <div>
                <Paper>
                    <div className={classes.root}>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography variant="h5" className={classes.title}>Sessions for {selectedDay.format(headerFormat)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Fab size='large' color='primary' className={classes.fab} onClick={() => searchSessions(previous)}>
                                   <ChevronLeftIcon/>{previous.format(dayFormat)}
                                </Fab>
                            </Grid>
                            <Grid item xs={6} align='right'>
                                <Fab color='primary' className={classes.fab} onClick={() => searchSessions(next)}>
                                    {next.format(dayFormat)}<ChevronRightIcon/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                    <SessionList sessions={sessions} />
                </Paper>
            </div>
        )
    }
}

CalendarPage.propTypes = {
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
    searchSessions: PropTypes.func.isRequired,
    selectedDay: PropTypes.instanceOf(moment).isRequired
};

CalendarPage.defaultProps = {
    sessions: [],
    classes: {},
    selectedDay: moment(),
};

const mapStateToProps = (state) => {
    return {
        sessions: getSessionsOrderedByStartTime(state),
        selectedDay: getselectedDay(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchSessions}, dispatch);
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CalendarPage));