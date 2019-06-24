import uuidv4 from "uuid/v4";

function createMuscleGroup(label) {
  return {
    id: uuidv4(),
    label
  };
}

const TRICEPS = createMuscleGroup("triceps");
const BICEPS = createMuscleGroup("biceps");
const CHEST = createMuscleGroup("chest");
const QUADS = createMuscleGroup("quads");
const CALVES = createMuscleGroup("calves");
const SHOULDERS = createMuscleGroup("shoulders");
const HAMSTRINGS = createMuscleGroup("hamstrings");
const ABS = createMuscleGroup("abs");
const LATS = createMuscleGroup("lats");
const LOWER_BACK = createMuscleGroup("lower back");
const MID_BACK = createMuscleGroup("mid back");

export const LOWER_BODY = [QUADS, HAMSTRINGS, CALVES];
export const UPPER_BODY = [
  BICEPS,
  TRICEPS,
  SHOULDERS,
  CHEST,
  ABS,
  LATS,
  LOWER_BACK,
  MID_BACK
];

export default [...UPPER_BODY, ...LOWER_BODY];
