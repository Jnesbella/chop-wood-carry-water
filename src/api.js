import { exercises, workouts } from "./MockData";

const api = {
  getExercises() {
    return Promise.resolve(exercises);
  },

  getWorkouts() {
    return Promise.resolve(workouts);
  }
};

export default api;
