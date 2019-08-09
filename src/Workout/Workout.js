import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import classNames from "classnames";
import { Typography, Chip, Divider, Button, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddExerciseModal from "../AddExercise/AddExerciseModal";

import { DroppableExerciseList as ExerciseList } from "./ExerciseList";

const useStyles = makeStyles(theme => ({
  workoutContainer: {
    position: "relative",
    minHeight: "100vh"
  },
  section: {
    margin: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  addExerciseButton: {
    float: "right"
  },
  modal: {
    position: "absolute"
  },
  setInput: {
    marginBottom: theme.spacing(1)
  }
}));

const renderSubtitle = (text, other) => {
  return (
    <div>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        display="inline"
        gutterBottom
      >
        {text}
      </Typography>
      {other}
    </div>
  );
};

function Workout(props) {
  const {
    exercises,
    sets,
    onAddExercises,
    onAddSet,
    onDeleteSet,
    onReorderSets
  } = props;
  const classes = useStyles();
  const [muscleGroups, setMuscleGroups] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const workoutContainerRef = React.useRef(null);

  React.useEffect(() => {
    setMuscleGroups(
      fp.flow(
        fp.flatten,
        fp.uniqBy(group => group.label),
        fp.sortBy(group => group.label)
      )(exercises.map(exercise => exercise.muscleGroups))
    );
  }, [exercises]);

  function renderWorkoutName() {
    return (
      <div className={classes.section}>
        {renderSubtitle("Workout Name")}

        <Typography variant="h3" color="textPrimary">
          {name}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      </div>
    );
  }

  function renderProgramInfo() {
    return (
      <div className={classes.section}>
        {renderSubtitle("Program")}

        <Typography variant="h6" color="textPrimary">
          PHAT
        </Typography>
      </div>
    );
  }

  function renderMuscleGroups() {
    return (
      <div className={classes.section}>
        {renderSubtitle("Muscle Groups")}

        {muscleGroups.map(muscleGroup => (
          <Chip
            key={muscleGroup.id}
            className={classes.chip}
            label={muscleGroup.label}
            color="secondary"
            clickable
          />
        ))}
      </div>
    );
  }

  const handleAddExercise = () => {
    setModalOpen(true);
  };

  const renderAddExerciseButton = () => {
    return (
      <Button
        className={classes.addExerciseButton}
        onClick={handleAddExercise}
        color="primary"
        fullWidth
        variant="contained"
      >
        Add exercises
      </Button>
    );
  };

  function renderExercises() {
    return (
      <div className={classes.section}>
        {renderSubtitle("Exercises")}
        <ExerciseList
          exercises={exercises}
          sets={sets}
          onAddSet={onAddSet}
          onDeleteSet={onDeleteSet}
          onReorder={onReorderSets}
        />
        <ListItem>{renderAddExerciseButton()}</ListItem>
      </div>
    );
  }

  function renderModal() {
    return (
      <AddExerciseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        container={() => workoutContainerRef.current}
        onAddExercises={exercisesToAdd => {
          onAddExercises(exercisesToAdd);
          setModalOpen(false);
        }}
      />
    );
  }

  const { name, description } = props;

  return (
    <div
      className={classNames("Workout", classes.workoutContainer)}
      ref={workoutContainerRef}
    >
      {renderWorkoutName()}
      <Divider />
      {renderProgramInfo()}
      <Divider />
      {muscleGroups.length > 0 && renderMuscleGroups()}
      {muscleGroups.length > 0 && <Divider />}
      {renderExercises()}
      {renderModal()}
    </div>
  );
}

Workout.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  exercises: PropTypes.array,
  sets: PropTypes.array,
  onAddExercises: PropTypes.func,
  onAddSet: PropTypes.func,
  onDeleteSet: PropTypes.func
};

Workout.defaultProps = {
  name: "",
  description: "",
  exercises: [],
  sets: [],
  onAddExercises: fp.noop,
  onAddSet: fp.noop,
  onDeleteSet: fp.noop,
  onReorderSets: fp.noop
};

export default Workout;
