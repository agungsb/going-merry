import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlipClock from './components/FlipClock';
import Form from './components/Form';

class App extends Component {
  static propTypes = {
    output: PropTypes.number.isRequired,
  }
  render() {
    const { output, timestamp } = this.props;
    return (
      <div
        className="bg-img1 size1 overlay1 p-b-35 p-l-15 p-r-15"
        style={{ backgroundImage: `url('${require('./images/bg01.jpg')}` }}
      >
        <div className="flex-col-c p-t-160 p-b-215 respon1">
          <div className="wrappic1">
            <Form />
            <FlipClock
              time={output}
              key={timestamp}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  output: state.app.output,
  timestamp: state.app.timestamp,
});

export default connect(mapStateToProps)(App);
