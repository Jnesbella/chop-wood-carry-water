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
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LibraryIcon from '@material-ui/icons/Collections';
import SearchIcon from '@material-ui/icons/Search';
import ProfileIcon from '@material-ui/icons/Face';

import Workout from "../Workout";
import Library from '../Library';
import Router from '../Router';

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
  const { store, history } = props;
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

  const renderBottomNav = () => {
    return (
      <BottomNavigation
        onChange={(event, newValue) => {}}
        showLabels
      >
        <BottomNavigationAction label="Library" icon={<LibraryIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction label="Profile" icon={<ProfileIcon />} />
      </BottomNavigation>
    );
  };

  function renderContent() {
    // return <Router />;
    return null;
  }

  return (
    <Provider store={store} className="App">
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <Container maxWidth="xs">
            <Paper square className={classes.content}>
              {/* <DndProvider backend={HTML5Backend}> */}
                <Router history={history} />
                {renderBottomNav()}
              {/* </DndProvider> */}
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
