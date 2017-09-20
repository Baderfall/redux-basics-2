import { combineReducers } from 'redux';

/* state === byId (arr of todos) */
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.todos.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

/* state === array of ids */
const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch(action.type) {
    case 'RECEIVE_TODOS':
      return action.todos.map(todo => todo.id);
    default:
      return state;
  }
};

/* state === array of ids */
const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state;
  }
  switch(action.type) {
    case 'RECEIVE_TODOS':
      return action.todos.map(todo => todo.id);
    default:
      return state;
  }
};

/* state === array of ids */
const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch(action.type) {
    case 'RECEIVE_TODOS':
      return action.todos.map(todo => todo.id);
    default:
      return state;
  }
};

/* state === idsByFilter obj of arrays of ids */
const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
});

/* state === byId (arr of todos) & idsByFilter obj of arrays of ids */
const todos = combineReducers({
  byId,
  idsByFilter
});

export default todos;

/* state === byId (arr of todos) & idsByFilter obj of arrays of ids */
export const getVisibleTodos = (state, filter) => {
  console.dir(state);
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};
