import { v4 } from 'uuid';

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
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        todos,
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

export const addTodo = text => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

export const toggleTodo = id => ({
  type: 'TOGGLE_TODO',
  id
});
