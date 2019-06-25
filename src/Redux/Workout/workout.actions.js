import uuidv4 from "uuid/v4";

export const ADD_EXERCISES = "ADD_EXERCISES";

function getAddExercisesAction(exercises) {
  return {
    type: ADD_EXERCISES,
    payload: exercises
  };
}

export function addExercises(exerciseIds) {
  return getAddExercisesAction(
    exerciseIds.map(exerciseId => ({ id: uuidv4(), exerciseId }))
  );
}
