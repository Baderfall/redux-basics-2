import { v4 } from 'uuid';
import * as api from '../api';

const requestTodos = (filter) => ({
  type: 'REQUEST_TODOS',
  filter
});

const receiveTodos = (todos, filter) => ({
  type: 'RECEIVE_TODOS',
  todos,
  filter
});

export const fetchTodos = filter => dispatch => {
  dispatch(requestTodos(filter));
  // Why this way in tutorial?
  // return api.fetchTodos(filter).then(todos => {
  api.fetchTodos(filter).then(todos => {
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
