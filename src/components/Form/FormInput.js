import React from 'react';
import PropTypes from 'prop-types';
import TextInputMask from 'react-masked-text';

class FormInput extends React.PureComponent {
  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
  }
  render() {
    const {
      onChangeText,
    } = this.props;
    return (
      <TextInputMask
        ref={ref => this._input = ref}
        placeholder="HH:mm:ss"
        kind={'datetime'}
        options={{
          format: 'HH:mm:ss'
        }}
        className="form-control"
        onChangeText={onChangeText} />
    );
  }
}

export default FormInput;