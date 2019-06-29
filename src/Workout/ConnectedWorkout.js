import { connect } from "react-redux";

import Workout from "./Workout";

import { addExercises } from "../Redux/Workout/workout.actions";

function mapStateToProps(state) {
  const { name, description, exercises } = state.workout;
  const { exercises: exercisesList } = state.data;

  const mappedExercises = exercises.map(exercise =>
    exercisesList.find(e => e.id === exercise.exerciseId)
  );

  return {
    name,
    description,
    exercises: mappedExercises
  };
}

const mapDispatchToProps = {
  onAddExercises: addExercises
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);
