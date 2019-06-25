import { connect } from "react-redux";

import AddExercise from "./AddExerciseComponent";

const mapStateToProps = state => {
  const { exercises } = state.data;

  return {
    exercises
  };
};

export default connect(mapStateToProps)(AddExercise);
