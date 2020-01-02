import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import classNames from "classnames";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import Box from "@material-ui/core/Box";

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
        subheader && <ListSubheader py={1}>
          <Typography variant="h6">
            {`${subheader} (${items.length})`}
          </Typography>
        </ListSubheader>
      }
      {
        items.length
          ? items.map(item => (
            <ListItem key={item.id} button divider >
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
    setsTemplates,
    equipment,
    gyms,
  } = props;
  const exercises = useSelector(state => state.data.exercises);
  const workouts = useSelector(state => state.data.workouts);
  const classes = useStyles();
  const [showModal, setShowModal] = useState(false);
  const libraryContainerRef = useRef(null);

  const renderExercises = () => renderListItems(exercises, 'Exercises');
  const renderWorkouts = () => renderListItems(workouts, 'Workouts');

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
        {renderExercises()}
        {renderWorkouts()}
      </List>
      {renderModal()}
    </div>
  );
}

Library.propTypes = {
  setsTemplates: PropTypes.array,
  equipment: PropTypes.array,
  gyms: PropTypes.array,
};

Library.defaultProps = {
  setsTemplates: [],
  equipment: [],
  gyms: [],
};

export default Library;
