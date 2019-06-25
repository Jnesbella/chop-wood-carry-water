import { ADD_EXERCISES } from "./workout.actions";

export const initialState = {
  name: "",
  description: "",
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
      exercises: action.payload
    };
  }
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
