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
  IconButton,
  CardHeader,
  CardContent,
  CardActions,
  ListItem,
  Card
} from "@material-ui/core";
import PropTypes from "prop-types";
import fp from "lodash/fp";
import { makeStyles } from "@material-ui/core/styles";
import uuidv4 from "uuid/v4";
import {
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon
} from "@material-ui/icons";

import useDrag from "../Hooks/useDrag";

import SetInput from "./SetInput";
import { makeSwipeable } from "./Gestures";

const SwipeableSetInput = makeSwipeable(SetInput);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  setInput: {
    padding: theme.spacing(0)
  },
  setDivider: {
    // marginTop: theme.spacing(1)
  },
  cardContent: {
    padding: theme.spacing(0, 1)
  },
  cardActions: {
    padding: theme.spacing(1)
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

  const renderSetCount = () => {
    return null;

    return (
      !expanded && (
        <Typography className="exercise-set-count" color="textSecondary">
          {sets.length} sets{" "}
        </Typography>
      )
    );
  };

  const renderCardHeader = () => {
    return (
      <CardHeader
        title={exerciseName}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      />
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
              label={`${index + 1}`}
              onDelete={() => onDeleteSet(set.id)}
            />
          </Box>
        ))}
      </Box>
    );
  };

  const renderAddSetButton = () => {
    return (
      <Button onClick={onAddSet} color="secondary" variant="outlined" fullWidth>
        Add Set
      </Button>
    );
  };

  const renderCardContent = () => {
    if (!sets.length) return null;

    return (
      <CardContent className={classes.cardContent}>{renderSets()}</CardContent>
    );
  };

  const renderCardActions = () => {
    return (
      <CardActions className={classes.cardActions}>
        {renderAddSetButton()}
      </CardActions>
    );
  };

  return (
    <Card ref={ref} className={classes.root}>
      {renderCardHeader()}

      {renderCardContent()}

      {renderCardActions()}
    </Card>
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
