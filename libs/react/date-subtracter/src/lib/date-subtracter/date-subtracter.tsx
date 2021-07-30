import React from 'react';
import { useField } from '@parm/react/use-field';
import { 
  formatDate, validateDate, 
  diffDays,
} from '@parm/util';

import './date-subtracter.scss';

/* eslint-disable-next-line */
export interface DateSubtracterProps {}

const validate = validateDate;

const placeholder = 'yyyy-mm-dd';

export const DateSubtracter = (props: DateSubtracterProps) => {
  const {
    value: startValue,
    field: start,
  } = useField({ 
    label: 'Start', value: '',
    validate, placeholder,
  });
  const {
    value: endValue,
    field: end,
  } = useField({ label: 'End', value: formatDate(new Date())});
  return (
    <div>
      {start}
      {end}
      Diff in days: {diffDays(startValue, endValue)}
    </div>
  );
};

export default DateSubtracter;
