import uuidv4 from "uuid/v4";

export const ADD_EXERCISES = "ADD_EXERCISES";
export const ADD_SET = "ADD_SET";

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
