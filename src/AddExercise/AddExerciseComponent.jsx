import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Toolbar,
  TextField,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Box,
  Divider,
  Paper
} from "@material-ui/core";
import fp from "lodash/fp";
import { makeStyles } from "@material-ui/core/styles";
import uuidv4 from "uuid/v4";

import {
  FILTERS,
  NAME_FILTER,
  MUSCLE_GROUP_FILTER,
  getHighlightsForString,
  getQueriesForSearch
} from "./AddExercise-utils";

const useStyles = makeStyles(theme => ({
  header: {
    position: "sticky",
    top: "0",
    zIndex: theme.zIndex.appBar,
    background: theme.palette.common.white
  }
}));

function AddExercise(props) {
  const { exercises, onAddExercises, onCancel, scrolled } = props;
  const classes = useStyles();

  // state
  const [filterParams, setFilterParams] = React.useState({
    [NAME_FILTER]: "",
    MUSCLE_GROUP_FILTER: []
  });
  const [filteredExercises, setFilteredExercises] = React.useState(exercises); // exercise[]
  const [selectedExercises, setSelectedExercises] = React.useState([]); // exerciseId[]

  // effects
  React.useEffect(() => {
    const filters = FILTERS.map(filter => filter(filterParams));
    setFilteredExercises(fp.flow(filters)(exercises));
  }, [filterParams, exercises]);

  // control
  const isExerciseSelected = exercise =>
    selectedExercises.includes(exercise.id);

  const handleSelectExercise = exercise =>
    setSelectedExercises(
      isExerciseSelected(exercise)
        ? selectedExercises.filter(exerciseId => exerciseId !== exercise.id)
        : [...selectedExercises, exercise.id]
    );

  const handleAddExercises = () => onAddExercises(selectedExercises);

  // view
  const renderCancelButton = () => (
    <Button color="secondary" onClick={onCancel}>
      Cancel
    </Button>
  );

  const renderAddButton = () => (
    <Button
      variant="contained"
      color="primary"
      disabled={!selectedExercises.length}
      onClick={handleAddExercises}
    >
      {selectedExercises.length ? `Add (${selectedExercises.length})` : "Add"}
    </Button>
  );

  const renderNameFilter = () => (
    <TextField
      value={filterParams[NAME_FILTER]}
      onChange={event =>
        setFilterParams({ ...filterParams, [NAME_FILTER]: event.target.value })
      }
      fullWidth
      label="Search exercises..."
    />
  );

  function renderFilterMessage() {
    const selectedExercisesCount = selectedExercises.length;
    const selectedExercisesIncludedInFilterCount = filteredExercises.filter(e =>
      selectedExercises.includes(e.id)
    ).length;
    const selectedExercisesHiddenByFilterCount =
      selectedExercisesCount - selectedExercisesIncludedInFilterCount;

    if (selectedExercisesHiddenByFilterCount === 0) return null;

    return (
      <Typography
        className={classes.filterResults}
        variant="body2"
        color="textSecondary"
      >
        {selectedExercisesHiddenByFilterCount} of {selectedExercisesCount}{" "}
        selected exercises are hidden by your search.
      </Typography>
    );
  }

  const renderFilters = () => {
    return (
      <Box className="AddExercise_filters">
        {renderNameFilter()}
        {renderFilterMessage()}
      </Box>
    );
  };

  const renderHeader = () => {
    return (
      <Paper className={classes.header} square elevation={scrolled ? 1 : 0}>
        <Toolbar>
          <Box py={2} width="100%">
            <Box
              className="AddExercise_actions"
              display="flex"
              justifyContent="space-between"
              pb={1}
            >
              {renderCancelButton()}
              {renderAddButton()}
            </Box>
            {renderFilters()}
          </Box>
        </Toolbar>
      </Paper>
    );
  };

  const renderExercise = (exercise, queries) => {
    const { name } = exercise;
    const selected = isExerciseSelected(exercise);
    const highlights = getHighlightsForString(name, queries);

    return (
      <ListItem
        key={exercise.id}
        button
        onClick={() => handleSelectExercise(exercise)}
        selected={selected}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selected}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText>
          <Typography display="inline" variant="body1" color="textPrimary">
            {highlights.length > 0 &&
              highlights.map(part => (
                <Typography
                  key={uuidv4()}
                  display="inline"
                  variant="body1"
                  color={part.highlight ? "textPrimary" : "textSecondary"}
                >
                  {part.text}
                </Typography>
              ))}
            {highlights.length === 0 && (
              <Typography display="inline" variant="body1" color="textPrimary">
                {name}
              </Typography>
            )}
          </Typography>
        </ListItemText>
      </ListItem>
    );
  };

  const renderExercises = () => {
    const search = filterParams[NAME_FILTER];
    const queries = search.length ? getQueriesForSearch(search) : [];

    return (
      <List>
        {filteredExercises.length ? (
          filteredExercises.map(exercise => renderExercise(exercise, queries))
        ) : (
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                variant: "body2",
                color: "textSecondary",
                align: "center",
                display: "block"
              }}
            >
              No exercises matching search criteria.
            </ListItemText>
          </ListItem>
        )}
      </List>
    );
  };

  return (
    <div className="AddExercise">
      {renderHeader()}
      {renderExercises()}
    </div>
  );
}

AddExercise.propTypes = {
  exercises: PropTypes.array,
  scrolled: PropTypes.bool,

  onAddExercises: PropTypes.func,
  onCancel: PropTypes.func
};

AddExercise.defaultProps = {
  exercises: [],
  scrolled: false,

  onAddExercises: fp.noop,
  onCancel: fp.noop
};

export default AddExercise;
