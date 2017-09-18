import { combineReducers } from 'redux';
import todos from './todos';

/* Reducer composition */
const todoApp = combineReducers({todos});

export default todoApp;
