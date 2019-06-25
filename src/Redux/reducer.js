import { combineReducers } from "redux";

import data from "./Data/data.reducer";
import workout from "./Workout/workout.reducer";

const reducer = combineReducers({
  data,
  workout
});

export default reducer;
