import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import classNames from "classnames";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddExerciseModal from "./AddExerciseModal";

const useStyles = makeStyles(theme => ({
  workoutContainer: {
    position: "relative"
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
  }
}));

const renderExercise = exercise => {
  return (
    <ListItem key={exercise.id}>
      <ListItemText primary={exercise.name} />
    </ListItem>
  );
};

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
  const classes = useStyles();
  const [muscleGroups, setMuscleGroups] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const workoutContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (muscleGroups.length) return;

    setMuscleGroups(
      fp.uniqBy(group => group.label)(
        fp.flatten(props.exercises.map(exercise => exercise.muscleGroups))
      )
    );
  });

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

  function renderExercises() {
    const { exercises } = props;
    return (
      <div className={classes.section}>
        {renderSubtitle(
          "Exercises",
          <Button
            className={classes.addExerciseButton}
            color="primary"
            onClick={handleAddExercise}
          >
            Add exercises
          </Button>
        )}

        <List dense>
          {exercises.length ? (
            exercises.map(renderExercise)
          ) : (
            <ListItem>No Exercises</ListItem>
          )}
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
        onAddExercises={exercises => {
          props.onAddExercises(exercises);
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
      {renderMuscleGroups()}
      <Divider />
      {renderExercises()}
      {renderModal()}
    </div>
  );
}

Workout.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  exercises: PropTypes.array,
  onAddExercises: PropTypes.func
};

Workout.defaultProps = {
  description: null,
  exercises: [],
  onAddExercises: fp.noop
};

export default Workout;
