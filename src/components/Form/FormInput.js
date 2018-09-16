import React from 'react';
import PropTypes from 'prop-types';
import TextInputMask from 'react-masked-text';

class FormInput extends React.PureComponent {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
  }
  onChangeText = (time) => {
    const { onChangeText } = this.props;
    const valid = this._input.isValid();
    onChangeText(time, valid);
  }
  render() {
    return (
      <TextInputMask
        ref={ref => this._input = ref}
        placeholder="HH:mm:ss"
        kind={'datetime'}
        options={{
          format: 'HH:mm:ss'
        }}
        className="form-control"
        onChangeText={this.onChangeText} />
    );
  }
}

export default FormInput;