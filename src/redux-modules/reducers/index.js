import moment from 'moment';
import {
  SET_OUTPUT,
  SET_TIME_END,
  SET_TIME_START,
} from './../actions';

const initialState = {
  end: null,
  output: 0,
  start: null,
  timestamp: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_OUTPUT: {
      const { end, start } = action;
      const duration = moment.duration(start.diff(end));
      const output = Math.abs(duration.asSeconds());
      return {
        ...state,
        output,
        timestamp: Date.now(),
      }
    }
    case SET_TIME_END:
      return {
        ...state,
        end: action.time
      }
    case SET_TIME_START:
      return {
        ...state,
        start: action.time
      }
    default:
      return state
  }
}