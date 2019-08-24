export function reorderExercises(exercises, { sourceIndex, destinationIndex }) {
  const source = exercises[sourceIndex];

  exercises.splice(sourceIndex, 1);
  exercises.splice(destinationIndex, 0, source);

  return exercises;
}
