import { combineReducers } from 'redux';

const createList = filter => {
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { completed } = entities.todos[toggleId];
    const shouldRemove = (
      (completed && filter === 'active') ||
      (!completed && filter === 'completed')
    );
    if (shouldRemove) {
      return state.filter(id => id !== toggleId);
    } else {
      return state;
    }
  };
  /* state === arr of ids */
  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_TODOS_SUCCESS':
        if (filter === action.filter) {
          return action.response.result;
        } else {
          return state;
        }
      case 'ADD_TODO_SUCCESS':
        if (filter !== 'completed') {
          return [...state, action.response.result];
        } else {
          return state;
        }
        case 'TOGGLE_TODO_SUCCESS':
          return handleToggle(state, action);
      default:
        return state;
    }
  };

  /* state === boolean */
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_TODOS_REQUEST':
        return true;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_TODOS_FAILURE':
        return action.message;
      case 'FETCH_TODOS_SUCCESS':
      case 'FETCH_TODOS_REQUEST':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

/* state === arr of ids */
export const getIds = state => state.ids;

/* state === boolean */
export const getIsFetching = state => state.isFetching;

/* state === string */
export const getErrorMessage = state => state.errorMessage;
