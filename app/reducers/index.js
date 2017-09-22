import { combineReducers } from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

/* state === listByFilter obj of arrs of ids */
const listByFilter = combineReducers({
  all: createList('all'),
  active: createList('active'),
  completed: createList('completed')
});

/* state === byId (arr of todos) & listByFilter obj of arrs of ids */
const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

/* state === byId (arr of todos) & listByFilter obj of arrs of ids */
export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

/* state === byId (arr of todos) & listByFilter obj of arrs of ids */
export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);

/* state === byId (arr of todos) & listByFilter obj of arrs of ids */
export const getErrorMessage = (state, filter) =>
  fromList.getErrorMessage(state.listByFilter[filter]);
