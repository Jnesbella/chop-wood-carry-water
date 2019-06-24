import { LOAD_EXERCISES_SUCCESS, LOAD_WORKOUT_SUCCESS } from "./data.actions";

export const initialState = {
  exercises: [],
  workouts: []
};

const ACTION_HANDLERS = {
  RESET_STATE: () => {
    return initialState;
  },
  [LOAD_EXERCISES_SUCCESS]: (state, action) => {
    return {
      ...state,
      exercises: action.payload
    };
  },
  [LOAD_WORKOUT_SUCCESS]: (state, action) => {
    return {
      ...state,
      workouts: action.payload
    };
  }
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
