import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import classNames from "classnames";
import {
  Typography,
  List,
  ListItem,
  Chip,
  Divider,
  Button,
  Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddExerciseModal from "../AddExercise/AddExerciseModal";

import ExerciseCard from "./ExerciseCard";

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
  const { exercises, sets, onAddExercises, onAddSet, onDeleteSet } = props;
  const classes = useStyles();
  const [muscleGroups, setMuscleGroups] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const workoutContainerRef = React.useRef(null);

  React.useEffect(() => {
    setMuscleGroups(
      fp.uniqBy(group => group.label)(
        fp.flatten(exercises.map(exercise => exercise.muscleGroups))
      )
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

  function handleAddExercise() {
    setModalOpen(true);
  }

  const getSetsForExercise = exercise => {
    return sets.filter(set => set.parentId === exercise.id);
  };

  const renderAddExerciseButton = (options = {}) => {
    return (
      <Button
        className={classes.addExerciseButton}
        onClick={handleAddExercise}
        color="primary"
        {...options}
      >
        Add exercises
      </Button>
    );
  };

  const renderExercise = exercise => {
    return (
      <ListItem key={exercise.id}>
        <Box flexGrow={1}>
          <ExerciseCard
            exerciseName={exercise.name}
            sets={getSetsForExercise(exercise)}
            onAddSet={() => onAddSet(exercise.id)}
            onDeleteSet={onDeleteSet}
          />
        </Box>
      </ListItem>
    );
  };

  function renderExercises() {
    return (
      <div className={classes.section}>
        {renderSubtitle("Exercises")}

        <List>
          {exercises.map(renderExercise)}
          {
            <ListItem>
              {renderAddExerciseButton({
                fullWidth: true,
                variant: "contained"
              })}
            </ListItem>
          }
        </List>
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
  description: null,
  exercises: [],
  sets: [],
  onAddExercises: fp.noop,
  onAddSet: fp.noop,
  onDeleteSet: fp.noop
};

export default Workout;
