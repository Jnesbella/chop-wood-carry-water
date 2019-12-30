import React from 'react';
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import fp from 'lodash/fp';

import { ExerciseEdit } from '../Exercise';
import Header from '../Header';

function AddNewExercise(props) {
  const { onBack, onSave } = props;

  return (
    <React.Fragment>
      <Header
        primaryAction={<Button onClick={onSave} color='primary'>Save</Button>}
        secondaryAction={<Button onClick={onBack} color='secondary'>Back</Button>}
      >
        Create New Exercise
      </Header>
      <ExerciseEdit />
    </React.Fragment>
  )
};

AddNewExercise.propTypes = {
  onSave: PropTypes.func,
  onBack: PropTypes.func,
}

AddNewExercise.defaultProps = {
  onSave: fp.noop,
  onBack: fp.noop,
};

export default AddNewExercise;
