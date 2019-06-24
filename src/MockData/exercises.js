import { getUniqueId } from "../DataModels/data-models";
import _ from "lodash";

import muscleGroups from "./muscleGroups";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getMuscleGroups() {
  const numberOfTimes = getRandomInt(3);
  return _.times(numberOfTimes, () => {
    const muscleGroupIndex = getRandomInt(muscleGroups.length);
    return muscleGroups[muscleGroupIndex];
  });
}

function createExercise(name) {
  return {
    id: getUniqueId(),
    name,
    muscleGroups: getMuscleGroups()
  };
}

export const exercises = [
  createExercise("Bicep Curl"),
  createExercise("Bench Press"),
  createExercise("Squat"),
  createExercise("Deadlift"),
  createExercise("Overhead Press"),
  createExercise("Tricep Pushdown"),
  createExercise("Ab Roller"),
  createExercise("Leg Raise"),
  createExercise("Lateral Dumbbell Raise"),
  createExercise("Face Pull")
];

// export const exercises = [
//   {
//     id: "7c26725a-cd78-8b3e-16ba-28d9e61fe476",
//     name: "Bicep Curl"
//   },
//   {
//     id: "e10764f1-5ff2-c6b6-4fd7-b4246538d7a3",
//     name: "Bench Press"
//   },
//   {
//     id: "674a6359-3dbd-4a87-8c72-600f27b46226",
//     name: "Squat"
//   },
//   {
//     id: "5729076d-e392-444b-bccc-b8f54f0a6cd9",
//     name: "Deadlift"
//   },
//   {
//     id: "8ff883f3-0a14-ad56-af09-d0d1fefbbede",
//     name: "Overhead Press"
//   },
//   {
//     id: "868912a7-9b33-77c6-f26c-f38bc94bd1ba",
//     name: "Tricep Pushdown"
//   },
//   {
//     id: "0966d364-390a-ae8c-c0c4-59188f4503ec",
//     name: "Ab Roller"
//   },
//   {
//     id: "1e128ae7-454b-6889-4a53-ef5c8296f37a",
//     name: "Leg Raise"
//   },
//   {
//     id: "d2498a77-9de5-67b1-59c4-0d127a85a1f6",
//     name: "Lateral Dumbbell Raise"
//   },
//   {
//     id: "a601291a-9d88-84a4-b48d-504c666640df",
//     name: "Face Pull"
//   }
// ];
