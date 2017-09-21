import { combineReducers } from 'redux';

const createList = filter => {
  /* state === arr of ids */
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'RECEIVE_TODOS':
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
      case 'REQUEST_TODOS':
        return true;
      case 'RECEIVE_TODOS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  });
};

export default createList;

/* state === arr of ids */
export const getIds = state => state.ids;

/* state === boolean */
export const getIsFetching = state => state.isFetching;
