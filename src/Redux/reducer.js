import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'

import data from "./Data/data.reducer";
import workout from "./Workout/workout.reducer";
import layout from './Layout/layout.reducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  data,
  workout,
  layout,
});

export default createRootReducer
