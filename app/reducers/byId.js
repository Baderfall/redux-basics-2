/* state === byId (arr of todos) */
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_TODOS_SUCCESS':
      const nextState = { ...state };
      action.todos.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    case 'ADD_TODO_SUCCESS':
      return { ...state, [action.todo.id]: action.todo };
    default:
      return state;
  }
};

export default byId;

/* state === byId (arr of todos) */
export const getTodo = (state, id) => state[id];
