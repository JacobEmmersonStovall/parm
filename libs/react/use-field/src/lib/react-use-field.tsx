import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

import './react-use-field.scss';

interface UseFieldProps {
  label: string;
  value: string;
  validate?: (value: string) => boolean;
  placeholder?: string;
  multiline?: boolean;
  type: string;
}

export const useField = (props: UseFieldProps) => {
  const {
    value, label, validate = () => true,
    placeholder = '', multiline = false,
    type = '',
  } = props;
  const [_value, setValue] = useState(value);
  const [hasBlurred, setBlurred] = useState(false);
  const onBlur = () => setBlurred(true);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const field = (
    <TextField
      type={type}
      style={{ width: '100%' }}
      label={label}
      placeholder={placeholder}
      multiline={multiline}
      value={_value}
      onChange={handleChange}
      onBlur={onBlur}
      error={hasBlurred && validate(value) !== true}
      helperText={hasBlurred && validate(value)}
    />
  );
  return {
    value: _value, field
  };
}

export type UseFieldsProps = Array<UseFieldProps>;

export const useFields = (props: UseFieldsProps) => {
  return props.map(p => useField(p));
};