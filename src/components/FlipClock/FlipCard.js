import React from 'react';
import PropTypes from 'prop-types';
import FlipTiles from './FlipTiles';

class FlipCard extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['days', 'hours', 'minutes', 'seconds']).isRequired,
    value: PropTypes.number.isRequired,
  }
  state = {
    play: false,
    previousValue: this.props.value,
    value: this.props.value,
  }
  static getDerivedStateFromProps(props, state) {
    if ((props.value >= 0) && (props.value !== state.value)) {
      return {
        previousValue: state.value,
        value: props.value
      }
    }
    return null;
  }
  render() {
    const { play, type } = this.props;
    const { value } = this.state;
    let before = (value + 1) >= 10 ? (value + 1).toString().split('') : `0${(value + 1)}`.split('');
    if (type === 'seconds' || type === 'minutes') {
      if ((value + 1) === 60) {
        before = `00`.split('');
      }
    } else if (type === 'hours') {
      if ((value + 1) === 24) {
        before = `00`.split('');
      }
    }
    const active = value >= 10 ? (value).toString().split('') : `0${value}`.split('');
    return (
      <React.Fragment>
        <span className={`flip-clock-divider ${type}`}><span className="flip-clock-label">Seconds</span></span>
        <FlipTiles play={play} before={before[0]} active={active[0]} />
        <FlipTiles play={play} before={before[1]} active={active[1]} />
      </React.Fragment>
    );
  }
}

export default FlipCard;