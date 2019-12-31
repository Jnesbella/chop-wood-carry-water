import uuidv4 from 'uuid/v4';

import { exercises, workouts } from "./MockData";

const EXERCISES = 'EXERCISES';

function getItems(source) {
  return Object.values(localStorage.getItem(source) || {});
};

function updateItem(source, item) {
  const items = getItems(source);
  localStorage.setItem(source, {
    ...items,
    [item.id]: item,
  });
};

const api = {
  getExercises() {
    return Promise.resolve(
      // exercises
      getItems(EXERCISES)
    );
  },

  getWorkouts() {
    return Promise.resolve(workouts);
  },

  saveExercise(payload = {}) {
    const id = payload.id || uuidv4();
    const exercise = {
      ...payload,
      id,
    };
    updateItem(EXERCISES, exercise);
    return Promise.resolve(exercise)
  }
};

export default api;
