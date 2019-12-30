import React from 'react';
import {
  Route,
  Redirect
} from "react-router";
import { ConnectedRouter } from 'connected-react-router'

import Library from '../Library';
import Workout from "../Workout";

function RouterComponent(props) {
  const { history } = props;

  return (
    <ConnectedRouter history={history} >
      <Route path="/library" component={Library} />
      <Route path="/workout/new" component={Workout} />
      <Route path="/search" render={() => (<div>Search</div>)} />
      <Route path="/profile" render={() => (<div>Profile</div>)} />
      <Redirect from='/' to='/library' />
    </ConnectedRouter>
  )
};

export default RouterComponent;