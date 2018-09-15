import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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

  setTimeStart = (time) => {
    let { error } = this.state;
    const start = moment(time, 'HH:mm:ss');
    if (start.isValid()) {
      this.props.setTimeStart(start);
      delete error.start;
      delete error.submit;
      this.setState({
        error,
      });
    } else {
      delete error.submit;
      error = {
        ...error,
        start: 'Input is invalid',
      };
      this.setState({ error });
    }
  }

  setTimeEnd = (time) => {
    let { error } = this.state;
    const end = moment(time, 'HH:mm:ss');
    if (end.isValid()) {
      this.props.setTimeEnd(end);
      delete error.end;
      delete error.submit;
      this.setState({
        error,
      });
    } else {
      delete error.submit;
      error = {
        ...error,
        end: 'Input is invalid',
      };
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