import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import fp from 'lodash/fp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  header: {
    position: "sticky",
    top: "0",
    zIndex: theme.zIndex.appBar,
    background: theme.palette.common.white
  }
}));

const SCROLL_EVENT = 'scroll';

function Header(props) {
  const {
    primaryAction,
    onPrimaryAction,
    primaryActionProps,
    secondaryAction,
    onSecondaryAction,
    secondaryActionProps,
    children,
    scrollContainerRef,
    ...otherProps,
  } = props;
  const classes = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = evt => {
    const { scrollTop } = evt.target;
    setScrolled(scrollTop !== 0);
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.addEventListener(SCROLL_EVENT, handleScroll);

    return () => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.removeEventListener(SCROLL_EVENT, handleScroll);
    }
  }, [scrollContainerRef.current]);

  return (
    <Paper
      className={classes.header}
      square
      elevation={scrolled ? 1 : 0}
    >
      <Toolbar disableGutters>
        <Box width="100%" {...otherProps}>
          <Box
            className="AddExercise_actions"
            display="flex"
            justifyContent="space-between"
            pb={1}
          >
            {
              secondaryAction && <Button
                color='secondary'
                {...secondaryActionProps}
                onClick={onSecondaryAction}
              >
                {secondaryAction}
              </Button>
            }
            {
              primaryAction && <Button
                color='primary'
                {...primaryActionProps}
                onClick={onPrimaryAction}
              >
                {primaryAction}
              </Button>
            }
          </Box>
          <Typography variant="h4" color="primary">
            {children}
          </Typography>
        </Box>
      </Toolbar>
    </Paper>
  );
};

Header.propTypes = {
  primaryAction: PropTypes.object,
  onPrimaryAction: PropTypes.func,
  primaryActionProps: PropTypes.object,
  secondaryAction: PropTypes.object,
  onSecondaryAction: PropTypes.func,
  secondaryActionProps: PropTypes.object,
  scrollContainerRef: PropTypes.object,
}

Header.defaultProps = {
  primaryAction: null,
  onPrimaryAction: fp.noop,
  primaryActionProps: {},
  secondaryAction: null,
  onSecondaryAction: fp.noop,
  secondaryActionProps: {},
  scrollContainerRef: {},
};

export default Header;
