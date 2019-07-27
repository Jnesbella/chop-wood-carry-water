export function reorderExercises(exercises, { sourceIndex, destinationIndex }) {
  const source = exercises[sourceIndex];
  const destination = exercises[destinationIndex];

  exercises.splice(sourceIndex, 1, destination);
  exercises.splice(destinationIndex, 1, source);

  return exercises;
}
