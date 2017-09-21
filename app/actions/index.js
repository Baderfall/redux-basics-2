import { v4 } from 'uuid';

import * as api from '../api';
import { getIsFetching } from '../reducers';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
});

const receiveTodos = (todos, filter) => ({
  type: 'RECEIVE_TODOS',
  todos,
  filter
});

export const fetchTodos = filter => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }
  dispatch(requestTodos(filter));
  return api.fetchTodos(filter).then(todos => {
    dispatch(receiveTodos(todos, filter));
  });
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
