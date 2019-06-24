import { exercises, workouts } from '../MockData';

import {
    createEmptyWorkout,
    createWorkoutFromStructure,
    WORKOUT_NODE,
    EXERCISE_NODE,
    SET_NODE,
    SUPER_SET_NODE,
} from './data-models';

// console.log('-- WORKOUT DATA --', JSON.stringify(workout.toDataStructure(), null, 4))
describe.only('data models', () => {
    describe('workout model', () => {
        let workout;

        test('creating an empty workout', () => {
            workout = createEmptyWorkout('My Workout');
            const { name, nodeType, firstChildId, children } = workout.toDataStructure();
            expect({ name, nodeType }).toEqual({ name: 'My Workout', nodeType: WORKOUT_NODE });
            expect(Object.keys(children).length).toBe(0);
            expect(firstChildId).toBeNull();
        });

        test('creating a workout from an existing structure', () => {
            workout = createWorkoutFromStructure(workouts[0]);
            expect(workout.getChildAt(0).nodeType).toBe(EXERCISE_NODE);
            expect(workout.getChildAt(0).getChildCount()).toBe(3);
            expect(workout.getChildAt(1).nodeType).toBe(EXERCISE_NODE);
            expect(workout.getChildAt(1).getChildCount()).toBe(5);
            expect(workout.getChildAt(2).nodeType).toBe(SUPER_SET_NODE);
            expect(workout.getChildAt(2).getChildCount()).toBe(2);
        });

        describe('workout functionality', () => {
            beforeEach(() => {
                workout = createEmptyWorkout('My Workout');
            });

            test('adding exercises', () => {
                let firstChildId;
                let children;

                workout.addExercise(exercises[0]);
                ({ firstChildId, children } = workout.toDataStructure());
                let firstChild = children[firstChildId];

                expect(Object.keys(children).length).toBe(1);
                expect(firstChild).toBeDefined();
                expect(firstChild.nodeType).toBe(EXERCISE_NODE);
                expect(firstChild.exerciseId).toBe(exercises[0].id);

                workout.addExercise(exercises[1]);
                ({ firstChildId, children } = workout.toDataStructure());
                firstChild = children[firstChildId];
                const secondChild = children[firstChild.nextSiblingId];

                expect(Object.keys(children).length).toBe(2);
                expect(secondChild).toBeDefined();
                expect(secondChild.nodeType).toBe(EXERCISE_NODE);
                expect(secondChild.exerciseId).toBe(exercises[1].id);
            });

            test('adding sets to exercises', () => {
                workout.addExercise(exercises[0]);
                const exerciseNode = workout.getFirstChild();

                exerciseNode.addSet();
                exerciseNode.addSet();
                exerciseNode.addSet();

                expect(exerciseNode.getChildCount()).toBe(3);
                expect(exerciseNode.getFirstChild().nodeType).toBe(SET_NODE);
                expect(exerciseNode.getLastChild().nodeType).toBe(SET_NODE);
                expect(exerciseNode.getChildAt(1).nodeType).toBe(SET_NODE);
                expect(exerciseNode.getChildAt(4)).toBeNull();
            });

            test('adding super sets', () => {
                workout.addSuperSet([exercises[0], exercises[1], exercises[2], exercises[3]]);

                const firstChild = workout.getFirstChild();
                expect(firstChild.nodeType).toBe(SUPER_SET_NODE);
                expect(firstChild.getChildCount()).toBe(4);
            });
        });
    });
});
