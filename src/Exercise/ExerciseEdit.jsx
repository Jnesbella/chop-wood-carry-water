import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

export function ExerciseEdit(props) {
  const [exerciseName, setExerciseName] = useState('');

  return (
    <React.Fragment>
      <TextField
        fullWidth
        label='Exercise Name'
        size='medium'
        value={exerciseName}
        onChange={event => setExerciseName(event.target.value)}
      />
    </React.Fragment>
  );
};
