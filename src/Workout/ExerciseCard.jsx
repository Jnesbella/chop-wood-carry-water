import React from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  ListItem
} from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { makeStyles } from "@material-ui/core/styles";
import uuidv4 from "uuid/v4";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import useDrag from "../Hooks/useDrag";

import SetInput from "./SetInput";
import { makeSwipeable } from "./Gestures";

const SwipeableSetInput = makeSwipeable(SetInput);

const useStyles = makeStyles(theme => ({
  setInput: {
    padding: theme.spacing(1, 2)
  },
  setDivider: {
    // marginTop: theme.spacing(1)
  },
  cardContent: {
    padding: 0
  }
}));

const ExerciseCard = React.forwardRef((props, ref) => {
  const {
    exerciseName,
    sets,
    onAddSet,
    onDeleteSet,
    headerProps,
    expanded,
    onToggle
  } = props;
  const classes = useStyles();

  const renderCardHeader = () => {
    return (
      <Box
        justifyContent="space-between"
        display="flex"
        width="100%"
        {...headerProps}
      >
        <Box display="flex">
          <Typography component="span" color="textPrimary">
            {exerciseName}
          </Typography>
        </Box>
        {!expanded && (
          <Typography className="exercise-set-count" color="textSecondary">
            {sets.length} sets{" "}
          </Typography>
        )}
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
    <ExpansionPanel expanded={expanded} onChange={onToggle} ref={ref}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        {renderCardHeader()}
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={classes.cardContent}>
        {renderSets()}
      </ExpansionPanelDetails>
      {sets.length > 0 && <Divider />}

      <ExpansionPanelActions>{renderAddSetButton()}</ExpansionPanelActions>
    </ExpansionPanel>
  );
});

ExerciseCard.protoTypes = {
  exerciseName: PropTypes.string,
  sets: PropTypes.array,
  onAddSet: PropTypes.func,
  onDeleteSet: PropTypes.func,
  headerProps: PropTypes.object,
  onToggle: PropTypes.func
};

ExerciseCard.defaultProps = {
  exerciseName: "",
  sets: [],
  onAddSet: fp.noop,
  onDeleteSet: fp.noop,
  headerProps: {},
  onToggle: fp.noop
};

export default ExerciseCard;

export const DRAG_ITEM_TYPE_EXERCISE = "DRAG_ITEM_TYPE_EXERCISE";

export function DraggableExerciseCard(props) {
  const { id, index, key, style, ...theRest } = props;

  const [
    collectedProps,
    dragHandleRef,
    drafPreviewSourceRef,
    DragPreviewImage
  ] = useDrag(DRAG_ITEM_TYPE_EXERCISE, id, index);

  return (
    <React.Fragment>
      <DragPreviewImage />
      <ListItem
        key={id}
        ref={dragHandleRef}
        style={{
          ...style,
          visibility: collectedProps.isDragging ? "hidden" : "visible"
        }}
      >
        <Box flexGrow={1}>
          <ExerciseCard {...theRest} ref={drafPreviewSourceRef} />
        </Box>
      </ListItem>
    </React.Fragment>
  );
}
