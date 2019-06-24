import React from "react";
import { Provider } from "react-redux";
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

import Workout from "../Workout";

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
  }

  function renderContent() {
    return <Workout />;
  }

  const { store } = props;

  return (
    <Provider store={store} className="App">
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Container maxWidth="xs">
            <Paper square className={classes.content}>
              {renderHeader()}
              {renderContent()}
            </Paper>
          </Container>
        </MuiThemeProvider>
      </div>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  onMount: PropTypes.func
};

App.defaultProps = {
  onMount: fp.noop
};

export default App;
