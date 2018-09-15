import React from 'react';
import PropTypes from 'prop-types';

class Countdown extends React.Component {
  static propTypes = {
    days: PropTypes.number,
    hours: PropTypes.number,
    minutes: PropTypes.minutes,
    seconds: PropTypes.seconds,
  }

  static defaultProps = {
    days: 15,
    hours: 18,
    minutes: 0,
    seconds: 0,
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const {
      days,
      hours,
      minutes,
      seconds,
    } = this.props;
    window.$(this._el).countdown100({
      /*Set Endtime here*/
      /*Endtime must be > current time*/
      endtimeYear: 0,
      endtimeMonth: 0,
      endtimeDate: days,
      endtimeHours: hours,
      endtimeMinutes: minutes,
      endtimeSeconds: seconds,
      timeZone: ""
      // ex:  timeZone: "America/New_York"
      //go to " http://momentjs.com/timezone/ " to get timezone
    });
  }

  render() {
    return (
      <div ref={ref => this._el = ref} />
    );
  }
}

export default Countdown;