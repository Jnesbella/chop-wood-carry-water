import { connect } from "react-redux";

import Workout from "./Workout";

import { addExercises, addSet } from "../Redux/Workout/workout.actions";

function mapStateToProps(state) {
  const { name, description, exercises, sets } = state.workout;
  const { exercises: exercisesList } = state.data;

  const mappedExercises = exercises.map(exercise =>
    exercisesList.find(e => e.id === exercise.exerciseId)
  );

  return {
    name,
    description,
    exercises: mappedExercises,
    sets
  };
}

const mapDispatchToProps = {
  onAddExercises: addExercises,
  onAddSet: addSet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);
