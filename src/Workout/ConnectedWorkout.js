import { connect } from "react-redux";

import Workout from "./Workout";

import { addExercises } from "../Redux/Workout/workout.actions";

function mapStateToProps(state) {
  const { name, description, exercises } = state.workout;

  return {
    name,
    description,
    exercises
  };
}

const mapDispatchToProps = {
  onAddExercises: addExercises
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);
