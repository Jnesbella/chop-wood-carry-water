import uuidv4 from "uuid/v4";

export const ADD_EXERCISES = "ADD_EXERCISES";
export const ADD_SET = "ADD_SET";
export const DELETE_SET = "DELETE_SET";
export const REORDER_EXERCISES = "REORDER_EXERCISES";

function getAddExercisesAction(exercises) {
  return {
    type: ADD_EXERCISES,
    payload: exercises
  };
}

function getAddSetAction(set) {
  return {
    type: ADD_SET,
    payload: set
  };
}

function getDeleteSetAction(setId) {
  return {
    type: DELETE_SET,
    payload: setId
  };
}

function getReorderExercisesActions(payload) {
  return {
    type: REORDER_EXERCISES,
    payload
  };
}

export function addExercises(exerciseIds) {
  return getAddExercisesAction(
    exerciseIds.map(exerciseId => ({ id: uuidv4(), exerciseId }))
  );
}

export function addSet(parentId) {
  return getAddSetAction({
    id: uuidv4(),
    parentId
  });
}

export function deleteSet(setId) {
  return getDeleteSetAction(setId);
}

export function reorderExercises(payload) {
  return getReorderExercisesActions(payload);
}
