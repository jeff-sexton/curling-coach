import React from 'react';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const DateTime = ({selectedDate, setSelectedDate}) => {


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="Game Date & Time"
        value={selectedDate}
        onChange={handleDateChange}
        format="yyyy/MM/dd HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTime;
