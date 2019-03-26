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

export const getSessionClientId = state => state.SESSIONS.session.clientId;
export const getSessionServiceId = state => state.SESSIONS.session.serviceId;
export const getSessionNotes = state => state.SESSIONS.session.notes;
export const getSessionLocation = state => state.SESSIONS.session.location;
export const getSessionStartTime = state => state.SESSIONS.session.startTime;
export const getSessionEndTime = state => state.SESSIONS.session.endTime;
export const getSessionDay = state => state.SESSIONS.session.day;
export const getSessionId = state => state.SESSIONS.session.id;