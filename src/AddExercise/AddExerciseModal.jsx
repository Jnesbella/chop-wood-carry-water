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
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    console.log("containerRef -- ", containerRef);
    if (!containerRef.current) return;
    containerRef.current.addEventListener("scroll", evt =>
      console.log("banana")
    );
  });

  return (
    <Modal
      {...theRest}
      onClose={onClose}
      style={{ position: "absolute" }}
      className={classes.root}
    >
      <Paper className={classes.modalContent} ref={containerRef}>
        <AddExercise onAddExercises={onAddExercises} onCancel={onClose} />
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
