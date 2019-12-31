import React from 'react';
import PropTypes from 'prop-types'
import fp from 'lodash/fp';

import { ExerciseEdit } from '../Exercise';
import Header from '../Header';

function AddNewExercise(props) {
  const {
    onBack,
    onSave,
    disableSave,
  } = props;

  return (
    <React.Fragment>
      <Header
        primaryAction='Save'
        onPrimaryAction={onSave}
        primaryActionProps={{
          disabled: disableSave,
        }}
        secondaryAction='Back'
        onSecondaryAction={onBack}
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
  disableSave: PropTypes.bool,
}

AddNewExercise.defaultProps = {
  onSave: fp.noop,
  onBack: fp.noop,
  disableSave: false,
};

export default AddNewExercise;
