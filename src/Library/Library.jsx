import React, { useState, useRef } from "react";
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
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';

import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import AppBar from '../AppBar';
import AddNewLibraryItemModal from './AddNewLibraryItemModal';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  newButton: {
    color: 'white',
  },
}));

function renderListItems(items, subheader) {
  return (
    <React.Fragment>
      {
        subheader && <ListSubheader>
          <Typography variant="h6">
            {`${subheader} (${items.length})`}
          </Typography>
        </ListSubheader>
      }
      {
        items.length
          ? items.map(item => (
            <ListItem key={item.id} button >
              <ListItemText primary={item.name} />
            </ListItem>
          ))
          : (
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  // align: 'center',
                  // display: 'block',
                }}
                primary={`No ${subheader}`}
              />
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
  const [showModal, setShowModal] = useState(false);
  const libraryContainerRef = useRef(null);

  const renderWorkouts = () => renderListItems(workouts, 'Workouts');

  const renderSetTemplates = () => renderListItems(setsTemplates, 'Set Templates');

  const renderExercises = () => renderListItems(exercises, 'Exercises');

  const renderModal = () => {
    return (
      <AddNewLibraryItemModal
        container={libraryContainerRef.current}
        onClose={() => setShowModal(false)}
        open={showModal}
      />
    );
  };

  return (
    <div
      className={classNames("Library", classes.root)}
      ref={libraryContainerRef}
    >
      <AppBar display="flex" alignItems="center">
        <Typography variant="h4">
          Library
        </Typography>
        <Box flex={1} />
        <Button
          className={classes.newButton}
          onClick={() => setShowModal(true)}
        >
          New
        </Button>
      </AppBar>
      <List component="nav" aria-label="main mailbox folders">
        {renderWorkouts()}
        <Divider />
        {renderSetTemplates()}
        <Divider />
        {renderExercises()}
      </List>
      {renderModal()}
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
