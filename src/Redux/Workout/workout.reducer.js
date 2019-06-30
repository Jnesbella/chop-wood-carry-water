import { ADD_EXERCISES, ADD_SET } from "./workout.actions";

export const initialState = {
  name: "Chest & Arms",
  programId: null,
  description: "Get your chest and arms burning with this workout.",
  exercises: [],
  sets: []
};

const ACTION_HANDLERS = {
  RESET_STATE: () => {
    return initialState;
  },
  [ADD_EXERCISES]: (state, action) => {
    return {
      ...state,
      exercises: [...state.exercises, ...action.payload]
    };
  },
  [ADD_SET]: (state, action) => {
    return {
      ...state,
      sets: [...state.sets, action.payload]
    };
  }
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
