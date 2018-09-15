export const SET_TIME_START = 'SET_TIME_START';
export const SET_TIME_END = 'SET_TIME_END';
export const SET_OUTPUT = 'SET_OUTPUT';

export function setTimeStart(time) {
  return {
    type: SET_TIME_START,
    time,
  }
}

export function setTimeEnd(time) {
  return {
    type: SET_TIME_END,
    time,
  }
}

export function setOutput(end, start) {
  return {
    type: SET_OUTPUT,
    end,
    start,
  }
}