import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

const DEFAULT_VALUES = {
  name: '',
};

export function ExerciseEdit(props) {
  const {
    className,
    onChange,
    values,
    ExerciseNameProps,
  } = props;

  const getValues = () => {
    return {
      ...DEFAULT_VALUES,
      ...values,
    };
  };

  const { name: exerciseName } = getValues();

  const handleChangeExerciseName = event => {
    const name = event.target.value;
    onChange({
      ...getValues(),
      name,
    });
  };

  // useEffect(() => {
  //   onChange({
  //     name: exerciseName,
  //   });
  // }, [exerciseName]);

  return (
    <Box className={className}>
      <TextField
        fullWidth
        label='Exercise Name'
        size='medium'
        value={exerciseName}
        onChange={handleChangeExerciseName}
        InputLabelProps={{ shrink: true }}
        {...ExerciseNameProps}
      />
    </Box>
  );
};

ExerciseEdit.defaultProps = {
  values: DEFAULT_VALUES,
  ExerciseNameProps: {},
};
