import { connect } from "react-redux";

import Workout from "./Workout";

import {
  addExercises,
  addSet,
  deleteSet,
  reorderExercises
} from "../Redux/Workout/workout.actions";

function mapStateToProps(state) {
  const { name, description, exercises, sets } = state.workout;
  const { exercises: exercisesList } = state.data;

  const mappedExercises = exercises.map(
    ({ id: idOfExerciseGroup, exerciseId }) => {
      const exercise = exercisesList.find(
        ({ id: idOfExercise }) => idOfExercise === exerciseId
      );

      return {
        ...exercise,
        id: idOfExerciseGroup,
        exerciseId
      };
    }
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
  onAddSet: addSet,
  onDeleteSet: deleteSet,
  onReorderExercises: reorderExercises
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Workout);
