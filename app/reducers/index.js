import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

/* Reducer composition */
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

export default todoApp;
