import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    secondaryAction,
    children,
    scrollContainerRef,
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
    <Paper className={classes.header} square elevation={scrolled ? 1 : 0}>
      <Toolbar>
        <Box width="100%">
          <Box
            className="AddExercise_actions"
            display="flex"
            justifyContent="space-between"
            pb={1}
          >
            {secondaryAction}
            {primaryAction}
          </Box>
          {children}
        </Box>
      </Toolbar>
    </Paper>
  );
};

Header.propTypes = {
  primaryAction: PropTypes.object,
  secondaryAction: PropTypes.object,
  scrollContainerRef: PropTypes.object,
}

Header.defaultProps = {
  primaryAction: null,
  secondaryAction: null,
  scrollContainerRef: {},
};

export default Header;
