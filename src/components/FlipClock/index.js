import React from 'react';
import PropTypes from 'prop-types';
import { secondsToHms } from '../../utils';
import FlipCard from './FlipCard';

let interval;
let timeout;

class FlipClock extends React.Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
  }
  static getDerivedStateFromProps(props, state) {
    if (props.time > 0) {
      if (props.time !== state.initialTime) {
        return {
          previousTime: state.initialTime,
          initialTime: props.time,
        }
      }
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      play: false,
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
        this.reset();
        this.setState({
          time: this.state.time - 1,
          play: true
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }
  reset = () => {
    timeout = setTimeout(() => {
      clearTimeout(timeout);
      this.setState({ play: false });
    }, 800);
  }
  render() {
    const {
      play,
      time
    } = this.state;
    const {
      days,
      hours,
      minutes,
      seconds,
    } = secondsToHms(time);
    return (
      <div className="flip-clock-wrapper">
        <FlipCard value={days} type="days" play={play} />
        <FlipCard value={hours} type="hours" play={play} />
        <FlipCard value={minutes} type="minutes" play={play} />
        <FlipCard value={seconds} type="seconds" play={play} />
      </div>
    );
  }
}

export default FlipClock;