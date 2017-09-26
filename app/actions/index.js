import { normalize } from 'normalizr';
import * as schema from './schema';

import * as api from '../api';
import { getIsFetching } from '../reducers';

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });
  return api.fetchTodos(filter).then(
    todos => {
      console.log('original response', todos);
      console.log('normalized response', normalize(todos, schema.arrayOfTodos));
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        response: normalize(todos, schema.arrayOfTodos),
        filter
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Smth went wrong.'
      });
    }
  );
};

/* We use func-action here (using thunk) to operate with async operations */
export const addTodo = text => dispatch =>
  api.addTodo(text).then(todo => {
    console.log('original response', todo);
    console.log('normalized response', normalize(todo, schema.todo));
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(todo, schema.todo)
    });
  });

export const toggleTodo = id => dispatch =>
  api.toggleTodo(id).then(todo => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(todo, schema.todo)
    });
  });
