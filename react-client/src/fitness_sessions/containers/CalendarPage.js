import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getSessionsOrderedByStartTime} from '../selectors';
import {searchSessions} from '../actionCreators';
import SessionList from '../components/SessionList';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import Grid from '../../clients/containers/ClientsPage';

class CalendarPage extends Component {
    componentDidMount() {
        this.props.searchSessions();
    }

    render() {
        const { sessions } = this.props;
        return (
            <div>
                <Paper>
                    <Typography variant="h5" align="center">Sessions for {moment().format("dddd")}</Typography>
                    <Typography component="span" variant="h6" align="center" gutterBottom>{moment().format("MMM Do YYYY")}</Typography>
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
        day: PropTypes.instanceOf(Date).isRequired,
        clientName: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        notes: PropTypes.string,
    })),
    searchSessions: PropTypes.func.isRequired,
};

CalendarPage.defaultProps = {
    sessions: [],
};

const mapStateToProps = (state) => {
    return {
        sessions: getSessionsOrderedByStartTime(state),
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchSessions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);