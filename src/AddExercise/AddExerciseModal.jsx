import React from "react";
import { Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fp from "lodash/fp";
import PropTypes from "prop-types";

import AddExercise from "./ConnectedAddExerciseComponent";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1)
  },
  modalContent: {
    outline: "none",
    overflow: "auto",
    height: "100%"
  }
}));

function AddExerciseModal(props) {
  const { onAddExercises, onClose, ...theRest } = props;
  const classes = useStyles();
  const [scrolled, setScrolled] = React.useState(false);

  return (
    <Modal
      {...theRest}
      onClose={onClose}
      style={{ position: "absolute" }}
      className={classes.root}
    >
      <Paper
        className={classes.modalContent}
        onScroll={evt => {
          const { scrollTop } = evt.target;
          setScrolled(scrollTop !== 0);
        }}
      >
        <AddExercise
          onAddExercises={onAddExercises}
          onCancel={onClose}
          scrolled={scrolled}
        />
      </Paper>
    </Modal>
  );
}

AddExerciseModal.propTypes = {
  ...Modal.propTypes,
  onAddExercises: PropTypes.func
};

AddExerciseModal.defaultProps = {
  exercises: [],
  onAddExercises: fp.noop
};

export default AddExerciseModal;
