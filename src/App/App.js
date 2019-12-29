import React from "react";
import { Provider, ReactReduxContext } from "react-redux";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Paper
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import { deepPurple, grey } from "@material-ui/core/colors";

import Router from '../Router';
import BottomNavigation from '../BottomNavigation';

import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

const useStyles = makeStyles(() => ({
  root: {
    background: grey[300]
  },
  content: {
    background: "white"
  }
}));

function App(props) {
  const { store, history, showBottomNav } = props;
  const classes = useStyles();

  React.useEffect(() => {
    props.onMount();
  });

  function renderHeader() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  };

  return (
    <Provider store={store} className="App">
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Container maxWidth="xs">
            <Paper square className={classes.content}>
              <Router
                history={history}
                bottomNavigation={showBottomNav && <BottomNavigation />}
              />
            </Paper>
          </Container>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onMount: PropTypes.func,
  showBottomNav: PropTypes.bool,
};

App.defaultProps = {
  onMount: fp.noop,
  showBottomNav: true,
};

export default App;
