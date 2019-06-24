import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Modal,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemIcon,
  Checkbox,
  AppBar,
  Toolbar,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import parse from "autosuggest-highlight/parse";
import fp from "lodash/fp";
import uuidv4 from "uuid/v4";

const useStyles = makeStyles(theme => ({
  modalContent: {
    outline: "none",
    margin: theme.spacing(1)
  },
  withSpace: {
    padding: theme.spacing(0, 1),
    margin: theme.spacing(0, 1)
  },
  addButton: {
    whiteSpace: "nowrap"
  },
  filterResults: {
    marginTop: theme.spacing(1)
  }
}));

function getQueriesForSearch(filters) {
  return fp
    .uniq(filters[NAME_FILTER].trim().split(/\s+/gim))
    .map(source => ({ regExp: new RegExp(source, "gim"), source }));
}

const NAME_FILTER = "NAME_FILTER";
const MUSCLE_GROUP_FILTER = "MUSCLE_GROUP_FILTER";

function filterByName(filters) {
  const queries = getQueriesForSearch(filters);

  return exercises =>
    exercises.filter(exercise => {
      if (!queries.length) return true;

      const { name } = exercise;
      return queries.every(query => query.regExp.test(name));
    });
}

function filterByMuscleGroup(filters) {
  return exercises => exercises;
}

const FILTERS = [filterByName, filterByMuscleGroup];

function AddExerciseModal(props) {
  const { exercises, ...theRest } = props;
  const classes = useStyles();
  const [filters, setFilters] = React.useState({
    [NAME_FILTER]: "",
    MUSCLE_GROUP_FILTER: []
  });
  const [filteredExercises, setFilteredExercises] = React.useState(exercises);
  const [selectedExercises, setSelectedExercises] = React.useState([]);

  React.useEffect(() => {
    const filterFuncs = FILTERS.map(filterFunc => filterFunc(filters));
    setFilteredExercises(fp.flow(filterFuncs)(exercises));
  }, [filters, exercises]);

  function isExerciseSelected(exercise) {
    return selectedExercises.includes(exercise.id);
  }

  function handleSelectExercise(exercise) {
    setSelectedExercises(
      isExerciseSelected(exercise)
        ? selectedExercises.filter(exerciseId => exerciseId !== exercise.id)
        : [...selectedExercises, exercise.id]
    );
  }

  function handleAddExercises() {
    props.onAddExercises(selectedExercises);
  }

  function renderHeader() {
    return (
      <Toolbar>
        <Button color="secondary" onClick={props.onClose}>
          Cancel
        </Button>

        <span style={{ display: "inline-block", width: "100%" }} />

        <Button
          variant="contained"
          color="primary"
          disabled={!selectedExercises.length}
          onClick={handleAddExercises}
          className={classes.addButton}
        >
          {selectedExercises.length
            ? `Add (${selectedExercises.length})`
            : "Add"}
        </Button>
      </Toolbar>
    );
  }

  function renderExercises() {
    const queries = filters[NAME_FILTER].length
      ? getQueriesForSearch(filters)
      : [];

    return (
      <List>
        {filteredExercises.map(exercise => {
          const { name } = exercise;

          let ranges = [];
          queries.forEach(query => {
            name.replace(query.regExp, (match, offset) => {
              ranges.push([offset, offset + query.source.length]);
            });
          }) || [];

          const parts =
            ranges.length > 0
              ? parse(name, fp.sortBy(range => range[0])(ranges))
              : [];

          return (
            <ListItem
              key={exercise.id}
              button
              onClick={() => handleSelectExercise(exercise)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={isExerciseSelected(exercise)}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemText>
                {parts.length > 0 &&
                  parts.map(part => (
                    <Typography
                      key={uuidv4()}
                      display="inline"
                      variant="body1"
                      color={part.highlight ? "textPrimary" : "textSecondary"}
                    >
                      {part.text}
                    </Typography>
                  ))}
                {parts.length === 0 && (
                  <Typography
                    display="inline"
                    variant="body1"
                    color="textPrimary"
                  >
                    {name}
                  </Typography>
                )}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  }

  function renderFilters() {
    const selectedExercisesCount = selectedExercises.length;
    const selectedExercisesIncludedInFilterCount = filteredExercises.filter(e =>
      selectedExercises.includes(e.id)
    ).length;
    const hiddenSelectedExercisesCount =
      selectedExercisesCount - selectedExercisesIncludedInFilterCount;
    return (
      <div className={classes.withSpace}>
        <TextField
          value={filters.search}
          onChange={event =>
            setFilters({ ...filters, [NAME_FILTER]: event.target.value })
          }
          fullWidth
          label="Search exercises..."
        />

        <Typography
          className={classes.filterResults}
          variant="body2"
          color="textSecondary"
          style={{
            visibility: hiddenSelectedExercisesCount > 0 ? "initial" : "hidden"
          }}
        >
          {hiddenSelectedExercisesCount} of {selectedExercisesCount} selected
          exercises are hidden by your search.
        </Typography>
      </div>
    );
  }

  return (
    <Modal {...theRest} style={{ position: "absolute" }}>
      <Paper className={classes.modalContent}>
        {renderHeader()}
        {renderFilters()}
        {renderExercises()}
      </Paper>
    </Modal>
  );
}

AddExerciseModal.propTypes = {
  ...Modal.propTypes,
  exercises: PropTypes.array,
  onAddExercises: PropTypes.func
};

AddExerciseModal.defaultProps = {
  exercises: [],
  onAddExercises: fp.noop
};

function mapStateToProps(state) {
  const { exercises } = state.data;
  return {
    exercises
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddExerciseModal);
