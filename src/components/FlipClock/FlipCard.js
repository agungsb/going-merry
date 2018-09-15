import React from 'react';
import PropTypes from 'prop-types';

class FlipCard extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(['days', 'hours', 'minutes', 'seconds']).isRequired,
    value: PropTypes.number.isRequired,
  }
  state = {
    value: this.props.value,
  }
  static getDerivedStateFromProps(props, state) {
    if ((props.value >= 0) && (props.value !== state.value)) {
      return {
        value: props.value
      }
    }
    return null;
  }
  render() {
    const { type } = this.props;
    const { value } = this.state;
    const before = (value + 1) >= 10 ? (value + 1).toString().split('') : `0${(value + 1)}`.split('');
    const active = value >= 10 ? (value).toString().split('') : `0${value}`.split('');
    return (
      <React.Fragment>
        <span className={`flip-clock-divider ${type}`}><span className="flip-clock-label">Seconds</span></span>
        <ul className="flip">
          <li className="flip-clock-before">
            <a href="" onClick={event => event.preventDefault()}>
              <div className="up">
                <div className="shadow" />
                <div className="inn">{before[0]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{before[0]}</div>
              </div>
            </a>
          </li>
          <li className="flip-clock-active">
            <a href="" onClick={event => event.preventDefault()}>
              <div className="up">
                <div className="shadow" />
                <div className="inn">{active[0]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{active[0]}</div>
              </div>
            </a>
          </li>
        </ul>
        <ul className="flip ">
          <li className="flip-clock-before">
            <a href="" onClick={event => event.preventDefault()}>
              <div className="up">
                <div className="shadow" />
                <div className="inn">{before[1]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{before[1]}</div>
              </div>
            </a>
          </li>
          <li className="flip-clock-active">
            <a href="" onClick={event => event.preventDefault()}>
              <div className="up">
                <div className="shadow" />
                <div className="inn">{active[1]}</div>
              </div>
              <div className="down">
                <div className="shadow" />
                <div className="inn">{active[1]}</div>
              </div>
            </a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default FlipCard;