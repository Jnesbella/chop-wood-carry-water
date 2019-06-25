import fp from "lodash/fp";
import parse from "autosuggest-highlight/parse";

function getQueriesForSearch(search) {
  return fp
    .uniq(search.trim().split(/\s+/gim))
    .map(source => ({ regExp: new RegExp(source, "gim"), source }));
}

export const NAME_FILTER = "NAME_FILTER";
export const MUSCLE_GROUP_FILTER = "MUSCLE_GROUP_FILTER";

function filterByName(filters) {
  const search = filters[NAME_FILTER];
  const queries = getQueriesForSearch(search);

  return exercises =>
    exercises.filter(exercise => {
      if (!queries.length) return true;

      const { name } = exercise;
      return queries.every(query => query.regExp.test(name));
    });
}

function filterByMuscleGroup(filters) {
  const muscleGroups = filters[MUSCLE_GROUP_FILTER];
  // exercise.muscleGroups
  return exercises => exercises.filter(exercise => true);
}

export const FILTERS = [filterByName];
