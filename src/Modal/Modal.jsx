import React from "react";
import { Modal, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import fp from "lodash/fp";
import PropTypes from "prop-types";
import classNames from 'classnames';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(theme => ({
  root: {
    // margin: theme.spacing(2),
  },
  modalContent: {
    outline: "none",
    overflow: "auto",
  },
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
  const theme = useTheme();

  const getStyle = () => ({
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  });

  return (
    <Modal
      onClose={onClose}
      style={getStyle()}
      open={open}
      className={classes.root}
      container={container}
      {...theRest}
    >
      <Paper
        {...modalContentProps}
        className={classNames(classes.modalContent, (modalContentProps || {}).className)}
      >
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
