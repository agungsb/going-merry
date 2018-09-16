import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { omit } from 'lodash';
import {
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
import {
  setTimeEnd as setTimeEndAction,
  setTimeStart as setTimeStartAction,
  setOutput as setOutputAction,
} from '../../redux-modules/actions';
import FormInput from './FormInput';

class Form extends React.PureComponent {
  state = {
    error: {},
  }

  setTimeStart = (time, valid) => {
    let { error } = this.state;
    const start = moment(time, 'HH:mm:ss', 'id');
    this.props.setTimeStart(start);
    if (time === '24:00:00') {
      valid = false;
    }
    if (valid) {
      this.setState({
        error: omit(error, ['start', 'submit'])
      });
    } else {
      error = {
        ...error,
        start: 'Start time is invalid',
      };
      omit(error, ['submit'])
      this.setState({ error });
    }
  }

  setTimeEnd = (time, valid) => {
    let { error } = this.state;
    const end = moment(time, 'HH:mm:ss', 'id');
    this.props.setTimeEnd(end);
    if (time === '24:00:00') {
      valid = false;
    }
    if (valid) {
      this.setState({
        error: omit(error, ['end', 'submit'])
      });
    } else {
      error = {
        ...error,
        end: 'End time is invalid',
      };
      omit(error, ['submit'])
      this.setState({ error });
    }
  }

  setOutput = () => {
    const { end, setOutput, start } = this.props;
    const { error } = this.state;
    const difference = end.diff(start, 'seconds');
    if (difference > -1) {
      setOutput(end, start);
    } else {
      this.setState({
        error: {
          ...error,
          submit: 'End time must be greater than start time',
        }
      });
    }
  }

  render() {
    const {
      end,
      start,
    } = this.props;
    const {
      error,
    } = this.state;
    return (
      <React.Fragment>
        <FormGroup>
          <Label for="exampleEmail" className="text-white"><strong>Start Time</strong></Label>
          <FormInput onChangeText={this.setTimeStart} />
          {start && error && error.start && <div className="text-white">{error.start}</div>}
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail" className="text-white"><strong>End Time</strong></Label>
          <FormInput onChangeText={this.setTimeEnd} />
          {end && error && error.end && <div className="text-white">{error.end}</div>}
        </FormGroup>
        <FormGroup>
          {error && error.submit && <div className="text-white">{error.submit}</div>}
        </FormGroup>
        <FormGroup>
          <Button
            color="danger"
            onClick={this.setOutput}
            disabled={!end || !start || Object.keys(error).length > 0}
          >Countdown</Button>
        </FormGroup>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  end: state.app.end,
  start: state.app.start,
});

const mapDispatchToProps = dispatch => ({
  setTimeEnd: time => dispatch(setTimeEndAction(time)),
  setTimeStart: time => dispatch(setTimeStartAction(time)),
  setOutput: (end, start) => dispatch(setOutputAction(end, start)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);