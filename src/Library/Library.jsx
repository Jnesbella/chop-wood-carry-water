import React from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import classNames from "classnames";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  libraryContainer: {
    position: "relative",
    minHeight: "100vh"
  },
}));

function renderListItems(items, subheader) {
  return (
    <React.Fragment>
      {subheader && <ListSubheader>{subheader}</ListSubheader>}
      {
        items.length
          ? items.map(item => (
            <ListItem key={item.id} button>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
          : (
            <ListItem button>
              <ListItemText primary={`No ${subheader}`} />
            </ListItem>
          )
      }
    </React.Fragment>
  );
};

function Library(props) {
  const {
    exercises,
    setsTemplates,
    workouts,
    equipment,
    gyms,
  } = props;

  const classes = useStyles();

  const renderWorkouts = () => renderListItems(workouts, 'Workouts');

  const renderSetTemplates = () => renderListItems(setsTemplates, 'Set Templates');

  const renderExercises = () => renderListItems(exercises, 'Exercises');

  return (
    <div
      className={classNames("Library", classes.libraryContainer)}
    >
      <List component="nav" aria-label="main mailbox folders">
        {renderWorkouts()}
        <Divider />
        {renderSetTemplates()}
        <Divider />
        {renderExercises()}
      </List>
    </div>
  );
}

Library.propTypes = {
  exercises: PropTypes.array,
  setsTemplates: PropTypes.array,
  workouts: PropTypes.array,
  equipment: PropTypes.array,
  gyms: PropTypes.array,
};

Library.defaultProps = {
  exercises: [],
  setsTemplates: [],
  workouts: [],
  equipment: [],
  gyms: [],
};

export default Library;
