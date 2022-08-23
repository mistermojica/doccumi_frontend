/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */

import React from 'react';
import {TextInputField} from 'evergreen-ui';

import {useFormatParseNumeral} from './useFormatParseNumeral';

function NumericalInputField(props) {
  const [value, setValue] = useFormatParseNumeral(props.value, {
    maxFixed: 5,
    whole: false
  });

  function handleChange(e) {
    props.onChange(setValue(e.target.value));
  }

  return (
    <TextInputField
      label={props.label}
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}

export default NumericalInputField;
