import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

export function ExerciseEdit(props) {
  const {
    className,
    onChange,
  } = props;
  const [exerciseName, setExerciseName] = useState('');

  useEffect(() => {
    onChange({
      name: exerciseName,
    });
  }, [exerciseName]);

  return (
    <Box className={className}>
      <TextField
        fullWidth
        label='Exercise Name'
        size='medium'
        value={exerciseName}
        onChange={event => setExerciseName(event.target.value)}
        InputLabelProps={{ shrink: true }}
      />
    </Box>
  );
};
