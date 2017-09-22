import { combineReducers } from 'redux';

const createList = filter => {
  /* state === arr of ids */
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'FETCH_TODOS_SUCCESS':
        return action.todos.map(todo => todo.id);
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
