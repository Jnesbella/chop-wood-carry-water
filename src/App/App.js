import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import fp from "lodash/fp";

import Router from '../Router';
import BottomNavigation from '../BottomNavigation';

import AppContainer from './AppContainer';
import SetupApp from './SetupApp';

function App(props) {
  const { store, history, showBottomNav } = props;

  return (
    <Provider store={store} className="App">
      <SetupApp />
      <AppContainer>
        <Router
          history={history}
          bottomNavigation={showBottomNav && <BottomNavigation />}
        />
      </AppContainer>
    </Provider>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  showBottomNav: PropTypes.bool,
};

App.defaultProps = {
  onMount: fp.noop,
  showBottomNav: true,
};

export default App;
