import api from "../../api";

export const LOAD_EXERCISES_SUCCESS = "LOAD_EXERCISES_SUCCESS";
export const LOAD_WORKOUT_SUCCESS = "LOAD_WORKOUT_SUCCESS";
export const SAVE_EXERCISE_SUCCESS = "SAVE_EXERCISE_SUCCESS";

function getLoadExercisesSuccessAction(exercises) {
  return {
    type: LOAD_EXERCISES_SUCCESS,
    payload: exercises
  };
};

function getLoadWorkoutsSuccessAction(workouts) {
  return {
    type: LOAD_WORKOUT_SUCCESS,
    payload: workouts
  };
};

function saveExercisesSuccessAction(exercise) {
  return {
    type: SAVE_EXERCISE_SUCCESS,
    payload: exercise
  };
};

export function loadData() {
  return async dispatch => {
    const exercises = await api.getExercises();
    const workouts = await api.getWorkouts();

    dispatch(getLoadExercisesSuccessAction(exercises));
    dispatch(getLoadWorkoutsSuccessAction(workouts));
  };
};

export function saveExercise(payload) {
  return async dispatch => {
    try {
      const exercise = await api.saveExercise(payload);
      console.log('-- saveExercise - ', exercise);
      dispatch(saveExercisesSuccessAction(exercise));
    }
    catch (err) {}
  };
};
