import React from "react";
import { Card, Box, Typography, Button, Divider } from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { makeStyles } from "@material-ui/core/styles";
import uuidv4 from "uuid/v4";

import SetInput from "./SetInput";
import { makeSwipeable } from "./Gestures";

const SwipeableSetInput = makeSwipeable(SetInput);

const useStyles = makeStyles(theme => ({
  setInput: {
    padding: theme.spacing(1, 2)
  },
  setDivider: {
    // marginTop: theme.spacing(1)
  }
}));

function ExerciseCard(props) {
  const { exerciseName, sets, onAddSet, onDeleteSet } = props;
  const classes = useStyles();

  const renderCardHeader = () => {
    return (
      <Box p={1}>
        <Typography>{exerciseName}</Typography>
      </Box>
    );
  };

  const renderSets = () => {
    if (!sets.length > 0) return null;

    return (
      <Box>
        {sets.map((set, index) => (
          <Box key={uuidv4()}>
            <SwipeableSetInput
              className={classes.setInput}
              label={`Set ${index + 1}`}
              onDelete={() => onDeleteSet(set.id)}
            />
            {index !== sets.length - 1 && <Divider variant="middle" />}
          </Box>
        ))}
      </Box>
    );
  };

  const renderAddSetButton = () => {
    return (
      <Button fullWidth onClick={onAddSet} color="primary">
        Add Set
      </Button>
    );
  };

  return (
    <Card square>
      {renderCardHeader()}
      <Divider />
      {renderSets()}
      {sets.length > 0 && <Divider />}
      {renderAddSetButton()}
    </Card>
  );
}

ExerciseCard.protoTypes = {
  exerciseName: PropTypes.string,
  sets: PropTypes.array,
  onAddSet: PropTypes.func,
  onDeleteSet: PropTypes.func
};

ExerciseCard.defaultProps = {
  exerciseName: "",
  sets: [],
  onAddSet: fp.noop,
  onDeleteSet: fp.noop
};

export default ExerciseCard;
