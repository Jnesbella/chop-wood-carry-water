import uuidv4 from 'uuid/v4';

import { exercises, workouts } from "./MockData";

// localStorage.clear();

const EXERCISES = 'EXERCISES';

function getItems(source) {
  const item = localStorage.getItem(source);
  return JSON.parse(item);
};

function updateItem(source, item) {
  const items = getItems(source) || {};
  const updatedItems = {
    ...items,
    [item.id]: item,
  };
  localStorage.setItem(source, JSON.stringify(updatedItems));
};

const api = {
  getExercises() {
    const exercises = Object.values(getItems(EXERCISES) || {});
    return Promise.resolve(
      exercises
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
