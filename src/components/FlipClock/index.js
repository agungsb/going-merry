import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHms } from '../../utils';
import FlipCard from './FlipCard';

let interval;

class FlipClock extends React.PureComponent {
  static propTypes = {
    time: PropTypes.number.isRequired,
  }
  static getDerivedStateFromProps(props, state) {
    if (props.time > 0 && props.time !== state.initialTime) {
      return {
        previousTime: state.initialTime,
        initialTime: props.time,
      }
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      previousTime: props.time,
      initialTime: props.time,
      time: props.time,
    };
  }
  componentDidMount() {
    this.countdown();
  }
  componentDidUpdate() {
    if (this.state.initialTime !== this.state.previousTime) {
      this.setState({ previousTime: this.state.initialTime, time: this.state.initialTime });
      clearInterval(interval);
      this.countdown();
    }
  }
  componentWillUnmount() {
    clearInterval(interval);
  }
  countdown = () => {
    interval = setInterval(() => {
      if (this.state.time > 0) {
        this.setState({ time: this.state.time - 1 });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
  render() {
    const {
      days,
      hours,
      minutes,
      seconds,
    } = secondsToHms(this.state.time);
    return (
      <div className="flip-clock-wrapper">
        <FlipCard value={days} type="days" />
        <FlipCard value={hours} type="hours" />
        <FlipCard value={minutes} type="minutes" />
        <FlipCard value={seconds} type="seconds" />
      </div>
    );
  }
}

export default FlipClock;