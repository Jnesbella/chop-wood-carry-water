import {
  LOAD_EXERCISES_SUCCESS,
  LOAD_WORKOUT_SUCCESS,
  SAVE_EXERCISE_SUCCESS,
} from "./data.actions";

export const initialState = {
  exercises: [],
  workouts: []
};

function updateDataSource(source, item) {
  const toMap = () => source.reducer((map, currentItem) => ({ ...map, [currentItem.id]: currentItem }), {});
  const updateItem = map => ({ ...map, [item.id]: item });
  const pipeline = [
    toMap,
    updateItem,
    Object.values,
  ];
  return pipeline.reduce((input, pipe) => pipe(input));
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
  },
  [SAVE_EXERCISE_SUCCESS]: (state, action) => {
    return {
      ...state,
      exercises: updateDataSource(state.exercises, action.payload),
    };
  },
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
