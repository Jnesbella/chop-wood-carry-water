import React, { useState } from 'react';
import PropTypes from 'prop-types'
import fp from 'lodash/fp';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

function AddNewExercise(props) {
  const {
    onBack,
    onSave,
    disableSave,
  } = props;
  const classes = useStyles();
  const [data, setData] = useState({});

  const handleChange = (changeData) => {
    setData(changeData);
  };

  const handleSave = () => {
    onSave(data);
  };

  return (
    <React.Fragment>
      <Header
        primaryAction='Save'
        onPrimaryAction={handleSave}
        primaryActionProps={{
          disabled: disableSave,
        }}
        secondaryAction='Back'
        onSecondaryAction={onBack}
        p={2}
        pb={0}
      >
        Create New Exercise
      </Header>
      <ExerciseEdit onChange={handleChange} className={classes.exerciseEdit} />
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
