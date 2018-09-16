import React from 'react';

class FlipTiles extends React.PureComponent {
  static getDerivedStateFromProps(props, state) {
    if (props.active !== state.active) {
      return {
        active: props.active,
        before: props.before,
        rerender: true,
      }
    }
    return {
      rerender: false,
    };
  }
  state = {
    active: this.props.active,
    before: this.props.before,
    rerender: false,
  }
  render() {
    const { play } = this.props;
    const { active, before, rerender } = this.state;
    return (
      <ul className={`flip${rerender && play ? ' play' : ''}`}>
        <li className="flip-clock-before">
          <a href="" onClick={event => event.preventDefault()}>
            <div className="up">
              <div className="shadow" />
              <div className="inn">{before}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inn">{before}</div>
            </div>
          </a>
        </li>
        <li className="flip-clock-active">
          <a href="" onClick={event => event.preventDefault()}>
            <div className="up">
              <div className="shadow" />
              <div className="inn">{active}</div>
            </div>
            <div className="down">
              <div className="shadow" />
              <div className="inn">{active}</div>
            </div>
          </a>
        </li>
      </ul>
    );
  }
}

export default FlipTiles;