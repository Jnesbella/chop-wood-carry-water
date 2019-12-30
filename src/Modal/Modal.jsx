import React from "react";
import { Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fp from "lodash/fp";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  modalContent: {
    outline: "none",
    overflow: "auto",
    height: "100%"
  }
}));

function ModalComponent(props) {
  const {
    onClose,
    open,
    container,
    modalContentProps,
    children,
    ...theRest
  } = props;
  const classes = useStyles();

  return (
    <Modal
      onClose={onClose}
      style={{ position: "absolute" }}
      className={classes.root}
      open={open}
      container={container}
    {...theRest}
    >
      <Paper {...modalContentProps}>
        {children}
      </Paper>
    </Modal>
  );
}

ModalComponent.propTypes = {
  container: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  modalContentProps: PropTypes.object,
};

ModalComponent.defaultProps = {
  container: null,
  onClose: fp.noop,
  open: false,
  modalContentProps: {},
};

export default ModalComponent;
