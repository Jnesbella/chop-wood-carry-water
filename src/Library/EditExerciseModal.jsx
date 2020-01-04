import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from 'react-redux';
import fp from 'lodash/fp';

import Modal from '../Modal';
import { saveExercise } from '../Redux/Data/data.actions';

import { ExerciseEdit } from '../Exercise';
import Header from '../Header';

const useStyles = makeStyles(theme => {
  return {
    exerciseEdit: {
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
    },
  };
});

function EditExerciseModal(props) {
  const { onClose } = props;
  const { exerciseId, ...modalProps } = props;
  const classes = useStyles();
  const exercises = useSelector(state => state.data.exercises);
  const [exercise, setExercise] = useState(null);
  const [values, setValues] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!exerciseId) return;
    const foundExercise = exercises.find(item => item.id === exerciseId);

    if (!foundExercise) {
      onClose();
      return;
    }

    setExercise(foundExercise);
    setValues({ ...foundExercise });
  }, [exerciseId]);

  const handleChange = changes => {
    setValues({
      ...values,
      ...changes,
    });
  };

  const handleSave = () => {
    const action = saveExercise({ ...values, id: exerciseId });
    dispatch(action);
    onClose();
  };

  return (
    <Modal
      {...modalProps}
    >
      <Header
        primaryAction='Save'
        onPrimaryAction={handleSave}
        primaryActionProps={{
          // disabled: disableSave,
        }}
        secondaryAction='Close'
        onSecondaryAction={onClose}
        p={2}
        pb={0}
      />
      <ExerciseEdit
        onChange={handleChange}
        values={values}
        className={classes.exerciseEdit}
      />
    </Modal>
  );
}

EditExerciseModal.propTypes = {
  exerciseId: PropTypes.string.isRequired,
};

EditExerciseModal.defaultProps = {};

export default EditExerciseModal;
