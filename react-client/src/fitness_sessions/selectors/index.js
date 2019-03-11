import {createSelector} from "reselect";
import moment from 'moment';

export const getselectedDay = state => state.SESSIONS.selectedDay || moment().startOf('isoWeek');
export const getSessions = state => state.SESSIONS.sessions;
export const getErrorMessage = state => state.SESSIONS.errorMessage;
export const getSessionModalOpen = state => state.SESSIONS.sessionModalOpen;
export const getDays = state => state.SESSIONS.days;

export const getSessionsWithStartTimeSortKey = createSelector([getSessions], sessions => Object.values(sessions)
    .map(session => ({
        ...session,
        sortKey: session.startTime
    })));

export const getSessionsOrderedByStartTime = createSelector(
    [getSessionsWithStartTimeSortKey],
    (sessions) => sessions
        .sort((first, second) => {
          moment.utc(first.startTime).diff(moment.utc(second.startTime))
        })
);