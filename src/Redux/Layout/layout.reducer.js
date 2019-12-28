const EXAMPLE_ACTION = 'EXAMPLE_ACTION';

export const initialState = {
  modal: null,
  showBottomNav: true,
};

const ACTION_HANDLERS = {
  RESET_STATE: () => {
    return initialState;
  },
  [EXAMPLE_ACTION]: (state, action) => {
    return {
      ...state,
      exercises: action.payload
    };
  },
};

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
