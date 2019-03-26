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
        sortKey: {
          hour: session.startTimeHour,
          minute: session.startTimeMinutes,
          meridiem: session.startTimeMeridiem,
        }
    })));

export const getSessionsOrderedByStartTime = createSelector(
    [getSessionsWithStartTimeSortKey],
    (sessions) => sessions
        .sort((a, b) => {
          if (a.startTimeMeridiem === "AM" && b.startTimeMeridiem === "PM") {
            return 1;
          }
          else if (a.startTimeMeridiem === "PM" && b.startTimeMeridiem === "AM") {
            return -1;
          }
          else {
            if (a.startTimeHour === b.startTimeHour) {
              if (a.startTimeMinutes > b.startTimeMinutes) {
                return 1;
              }
              else if (a.startTimeMinutes < b.startTimeMinutes) {
                return -1;
              }
              else {
                return 0;
              }
            }
            else {
              if (a.startTimeHour > b.startTimeHour) {
                return 1;
              }
              else {
                return -1;
              }
            }
          }
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