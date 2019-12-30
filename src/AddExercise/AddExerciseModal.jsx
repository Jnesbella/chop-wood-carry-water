import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import fp from "lodash/fp";
import PropTypes from "prop-types";

import Modal from '../Modal';

import AddExercise from "./ConnectedAddExerciseComponent";

const useStyles = makeStyles(theme => ({
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
      modalContentProps={{
      className: classes.modalContent,
      onScroll: evt => {
        const { scrollTop } = evt.target;
        setScrolled(scrollTop !== 0);
      },
      }}
      {...theRest}
    >
      <AddExercise
        onAddExercises={onAddExercises}
        onCancel={onClose}
        scrolled={scrolled}
      />
    </Modal>
  );
}

AddExerciseModal.propTypes = {
  onAddExercises: PropTypes.func
};

AddExerciseModal.defaultProps = {
  onAddExercises: fp.noop
};

export default AddExerciseModal;
