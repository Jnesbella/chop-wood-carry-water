import api from "../../api";

export const LOAD_EXERCISES_SUCCESS = "LOAD_EXERCISES_SUCCESS";
export const LOAD_WORKOUT_SUCCESS = "LOAD_WORKOUT_SUCCESS";

function getLoadExercisesSuccessAction(exercises) {
  return {
    type: LOAD_EXERCISES_SUCCESS,
    payload: exercises
  };
}

function getLoadWorkoutsSuccessAction(workouts) {
  return {
    type: LOAD_WORKOUT_SUCCESS,
    payload: workouts
  };
}

export function loadData() {
  return async dispatch => {
    const exercises = await api.getExercises();
    const workouts = await api.getWorkouts();

    dispatch(getLoadExercisesSuccessAction(exercises));
    dispatch(getLoadWorkoutsSuccessAction(workouts));
  };
}
