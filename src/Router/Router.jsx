import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router";
import { ConnectedRouter } from 'connected-react-router'

import Library from '../Library';

function RouterComponent(props) {
  const { history } = props;
  return (
    <ConnectedRouter history={history} >
      <Route path="/library" component={Library} />
      <Redirect from='/' to='/library' />
    </ConnectedRouter>
  )
};

export default RouterComponent;