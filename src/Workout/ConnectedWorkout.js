import { connect } from "react-redux";
import fp from "lodash/fp";

import Workout from "./Workout";

import { createWorkoutFromStructure } from "../DataModels/data-models";

function mapStateToProps(state) {
  const { exercises } = state.data;
  // const workout = createWorkoutFromStructure(
  //   fp.get(state, ["app", "workouts", 0]) || {}
  // );
  return {
    name: "Chest & Arms",
    description: "Pump up your bis and tris and burn those abs.",
    exercises
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);
