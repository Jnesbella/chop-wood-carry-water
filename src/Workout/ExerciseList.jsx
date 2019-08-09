import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { List, Box, ListItem } from "@material-ui/core";
import fp from "lodash/fp";

import ExercisePlaceholder from "./ExercisePlaceholder";

import { DraggableExerciseCard as ExerciseCard } from "./ExerciseCard";

function ExerciseList(props) {
  const {
    exercises,
    sets,
    onAddSet,
    onDeleteSet,
    forceExercisesCollapsed
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

  const [dragging, setDragging] = React.useState(false);

  const handleDragEnd = result => {
    setDragging(false);

    const { source, destination } = result;
    if (!destination || destination.droppableId !== source.droppableId) return;

    onReorder({
      sourceIndex: source.index,
      destinationIndex: destination.index
    });
  };

  return (
    <List>
      <DragDropContext
        onDragEnd={handleDragEnd}
        onBeforeDragStart={() => setDragging(true)}
      >
        <Droppable droppableId="droppable" type="EXERCISE_CARD">
          {(provided, snapshot) => {
            return (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <ExerciseList forceExercisesCollapsed={dragging} {...theRest} />

                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </List>
  );
}
