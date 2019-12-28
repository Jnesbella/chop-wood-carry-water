import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';

import createRootReducer from './reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
    ),
  ),
)

  return store
};
