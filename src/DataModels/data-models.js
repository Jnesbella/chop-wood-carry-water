import fp from "lodash/fp";

export const NODE = "NODE";
export const EXERCISE_NODE = "EXERCISE_NODE";
export const SET_NODE = "SET_NODE";
export const WORKOUT_NODE = "WORKOUT_NODE";
export const SUPER_SET_NODE = "SUPER_SET_NODE";
export const PROGRAM_NODE = "PROGRAM_NODE";

const DROP_SET = "DROP_SET";
const AMRAP_SET = "AMRAP_SET";
const WARMUP_SET = "WARMUP_SET";
const FAILED_SET = "FAILED_SET";
const DEFAULT_SET = "DEFAULT_SET";

export function getUniqueId() {
  const chr4 = () =>
    Math.random()
      .toString(16)
      .slice(-4);

  return (
    chr4() +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    "-" +
    chr4() +
    chr4() +
    chr4()
  );
}

class Node {
  id = null;
  nodeType = NODE;
  parent = null;
  previousSibling = null;
  nextSibling = null;
  children = {};

  constructor() {
    this.id = getUniqueId();
  }

  getChildCount() {
    return Object.keys(this.children).length;
  }

  getFirstChild() {
    return fp.find(child => !child.previousSibling)(this.children);
  }

  getLastChild() {
    return fp.find(child => !child.nextSibling)(this.children);
  }

  getChildAt(index) {
    if (index >= this.getChildCount() || index < 0) return null;

    let child = this.getFirstChild();
    for (let i = 0; i < index; i++) {
      child = child.nextSibling;
    }
    return child;
  }

  removeChild(childToRemove) {
    if (!childToRemove) return;

    const {
      [childToRemove.id]: unwantedChild,
      ...theChildrenToKeep
    } = this.children;
    const { nextSibling, previousSibling } = unwantedChild.nextSibling;

    previousSibling.nextSibling = nextSibling;
    nextSibling.previousSibling = previousSibling;

    unwantedChild.previousSibling = null;
    unwantedChild.nextSibling = null;
    unwantedChild.parent = null;
    this.children = theChildrenToKeep;
  }

  remove() {
    if (!this.parent) return;
    this.parent.removeChild(this);
  }

  appendChild(child) {
    if (!child || this.children[child.id]) return;

    child.remove();
    child.parent = this;

    const lastChild = this.getLastChild();
    if (lastChild) {
      child.previousSibling = lastChild;
      lastChild.nextSibling = child;
    }

    this.children = {
      ...this.children,
      [child.id]: child
    };
  }

  insertNodeBefore(node, afterNode) {
    if (!node || !afterNode || !this.children[afterNode.id]) return;

    node.remove();

    node.parent = this;
    node.previousSibling = afterNode.previousSibling;
    node.nextSibling = afterNode;
    afterNode.previousSibling = node;

    this.children = {
      ...this.children,
      [node.id]: node
    };
  }

  toDataStructure() {
    const { id, nodeType, parent, previousSibling, nextSibling } = this;
    const firstChild = this.getFirstChild();

    return {
      id,
      nodeType,
      parentId: parent ? parent.id : null,
      previousSiblingId: previousSibling ? previousSibling.id : null,
      nextSiblingId: nextSibling ? nextSibling.id : null,
      firstChildId: firstChild ? firstChild.id : null,
      children: Object.keys(this.children)
    };
  }
}

class SetNode extends Node {
  nodeType = SET_NODE;
  setType = DEFAULT_SET; // AMRAP, drop, failure, warmup
  intensity = undefined;
  volume = undefined;

  constructor({ intensity, volume, setType } = {}) {
    super();
    this.intensity = intensity;
    this.volume = volume;
    this.setType = setType || this.setType;
  }

  toDataStructure() {
    const { intensity, volume, setType } = this;

    return {
      ...super.toDataStructure(),
      intensity,
      volume,
      setType
    };
  }
}

class ExerciseNode extends Node {
  nodeType = EXERCISE_NODE;
  exerciseId = undefined;

  constructor({ exerciseId }) {
    super();
    this.exerciseId = exerciseId;
  }

  addSet() {
    this.appendChild(new SetNode());
  }

  toDataStructure() {
    const { nodeType, exerciseId } = this;
    return {
      ...super.toDataStructure(),
      exerciseId
    };
  }
}

class SuperSetNode extends Node {
  nodeType = SUPER_SET_NODE;

  constructor() {
    super();
  }

  addSet() {
    fp.each(child => child.appendChild(new SetNode()))(this.children);
  }

  toDataStructure() {
    return super.toDataStructure();
  }
}

class WorkoutNode extends Node {
  nodeType = WORKOUT_NODE;
  name = null;
  description = null;
  program = null;

  constructor({ name, description, program } = {}) {
    super();
    this.name = name;
    this.description = description;
    this.program = program;
  }

  addExercise(exercise, toNode = this) {
    if (
      toNode !== this &&
      !this.children[toNode.id] &&
      fp.find(nodeType => nodeType === toNode.nodeType)([
        WORKOUT_NODE,
        SUPER_SET_NODE
      ])
    )
      return;

    const exerciseId = exercise.id;
    toNode.appendChild(new ExerciseNode({ exerciseId }));
  }

  addSuperSet(exercises = []) {
    const superSetNode = new SuperSetNode();
    this.appendChild(superSetNode);
    fp.forEach(exercise => this.addExercise(exercise, superSetNode))(exercises);
  }

  addToProgram(program) {
    if (this.program) {
      this.program.removeWorkout(this);
    }

    program.addWorkout(this);
  }

  toDataStructure() {
    return {
      ...super.toDataStructure(),
      name: this.name,
      children: getFlattenedNodeStructure(this.getFirstChild())
    };
  }
}

class ProgramNode extends Node {
  nodeType = PROGRAM_NODE;
  name = null;
  doGraduate = fp.noop;

  constructor({ name, doGraduate } = {}) {
    super();
    this.name = name || this.name;
    this.doGraduate = doGraduate || this.doGraduate;
  }

  addWorkout(workout) {}

  removeWorkout(workout) {}

  startNextCycle() {
    this.doGraduate(this);
  }

  toDataStructure() {}
}

const NODE_TYPE_TO_NODE_CLASS_MAP = {
  [NODE]: Node,
  [EXERCISE_NODE]: ExerciseNode,
  [SET_NODE]: SetNode,
  [WORKOUT_NODE]: WorkoutNode,
  [SUPER_SET_NODE]: SuperSetNode,
  [PROGRAM_NODE]: ProgramNode
};

function getFlattenedNodeStructure(node, flattenedStructure = {}) {
  if (!node) return flattenedStructure;
  return {
    [node.id]: node.toDataStructure(),
    ...getFlattenedNodeStructure(node.getFirstChild(), flattenedStructure),
    ...getFlattenedNodeStructure(node.nextSibling, flattenedStructure)
  };
}

function expandNodeStructure(parentNode, firstChildId, flattenedChildren) {
  let currentChildId = firstChildId;
  while (currentChildId) {
    const currentChildData = flattenedChildren[currentChildId];
    const { nodeType } = currentChildData;
    const NodeClass = NODE_TYPE_TO_NODE_CLASS_MAP[nodeType];
    const currentChildNode = new NodeClass(currentChildData);

    parentNode.appendChild(currentChildNode);
    expandNodeStructure(
      currentChildNode,
      currentChildData.firstChildId,
      flattenedChildren
    );

    currentChildId = currentChildData.nextSiblingId;
  }

  return parentNode;
}

export function createEmptyWorkout(name) {
  return new WorkoutNode({ name });
}

export function createWorkoutFromStructure(structure) {
  if (structure.nodeType !== WORKOUT_NODE) return null;

  const workout = new WorkoutNode(structure);
  const { firstChildId, children } = structure;
  return expandNodeStructure(workout, firstChildId, children);
}
