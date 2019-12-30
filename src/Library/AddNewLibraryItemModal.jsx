import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import fp from "lodash/fp";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

import Modal from '../Modal';

import AddNewExercise from './AddNewExercise';

const useStyles = makeStyles(theme => ({
  modalContent: {
    outline: "none",
    padding: theme.spacing(1),
  },
  nextButton: {
    marginLeft: theme.spacing(1),
  },
}));

function AddNewLibraryItemModal(props) {
  const { onClose } = props;
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState('workout');

  const handleNext = () => {
    history.push(`/${value}/new`);
  };

  return (
    <Modal
      modalContentProps={{
        className: classes.modalContent
      }}
      {...props}
    >
      <AddNewExercise />
      {/* <FormControl component="fieldset">
        <FormLabel>
          <Typography variant="h4" color="primary">
            Create New
          </Typography>
        </FormLabel>
        <RadioGroup aria-label="create" name="create" value={value} onChange={event => setValue(event.target.value)}>
          <FormControlLabel value="exercise" control={<Radio />} label="Exercise" />
          <FormControlLabel value="set template" control={<Radio />} label="Set Template" />
          <FormControlLabel value="workout" control={<Radio />} label="Workout" />
          <FormControlLabel value="gym" control={<Radio />} label="Gym" />
        </RadioGroup>
      </FormControl>
      <Box display="flex">
        <Box flex={1} />
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.nextButton}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box> */}
    </Modal>
  );
}

AddNewLibraryItemModal.propTypes = {};

AddNewLibraryItemModal.defaultProps = {};

export default AddNewLibraryItemModal;
