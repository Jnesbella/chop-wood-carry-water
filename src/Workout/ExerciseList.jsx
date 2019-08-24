import React from "react";
import PropTypes from "prop-types";
import { List, Box, ListItem } from "@material-ui/core";
import fp from "lodash/fp";

import useDrop from "../Hooks/useDrop";
import useDragLayer from "../Hooks/useDragLayer";

import {
  DraggableExerciseCard as ExerciseCard,
  DRAG_ITEM_TYPE_EXERCISE
} from "./ExerciseCard";

function ExerciseList(props) {
  const {
    exercises,
    sets,
    onAddSet,
    onDeleteSet,
    forceExercisesCollapsed,
    itemStylerFunc
  } = props;

  const [expandedExercises, setExpandedExercises] = React.useState({});

  const getSetsForExercise = exercise => {
    return sets.filter(set => set.parentId === exercise.id);
  };

  const handleToggleExercise = exerciseId => {
    return () =>
      setExpandedExercises({
        ...expandedExercises,
        [exerciseId]: !expandedExercises[exerciseId]
      });
  };

  const renderExercise = (exercise, index) => {
    const { id } = exercise;

    const expanded = !!expandedExercises[id] && !forceExercisesCollapsed;

    return (
      <ExerciseCard
        key={id}
        id={id}
        index={index}
        exerciseName={exercise.name}
        sets={getSetsForExercise(exercise)}
        onAddSet={() => onAddSet(id)}
        onDeleteSet={onDeleteSet}
        expanded={expanded}
        onToggle={handleToggleExercise(id)}
        style={itemStylerFunc(index)}
      />
    );
  };

  return <div>{exercises.map(renderExercise)}</div>;
}

ExerciseList.defaultProps = {
  exercises: [],
  sets: [],
  onAddSet: fp.noop,
  onDeleteSet: fp.noop,
  forceExercisesCollapsed: false
};

export default ExerciseList;

export function DroppableExerciseList(props) {
  const { onReorder, ...theRest } = props;

  const [isDragging, getItemStyles, currentDragIndex] = useDragLayer();
  const [dropRef] = useDrop(DRAG_ITEM_TYPE_EXERCISE, item =>
    onReorder({
      sourceIndex: item.index,
      destinationIndex: currentDragIndex
    })
  );

  // React.useEffect(() => {
  //   setDragging(collectedProps.isDragging);
  // }, [collectedProps.isDragging]);

  // const handleDragEnd = result => {
  //   setDragging(false);

  //   const { source, destination } = result;
  //   if (!destination || destination.droppableId !== source.droppableId) return;

  //   onReorder({
  //     sourceIndex: source.index,
  //     destinationIndex: destination.index
  //   });
  // };

  // const handleDragStart = () => setDragging(true);

  return (
    <List ref={dropRef}>
      <ExerciseList
        forceExercisesCollapsed={isDragging}
        itemStylerFunc={getItemStyles}
        {...theRest}
      />
    </List>
  );
}
