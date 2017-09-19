/* Single todo reducer */
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {id: action.id, text: action.text, completed: false};
    case 'TOGGLE_TODO':
      if(state.id === action.id) {
        return Object.assign({}, state, {completed: !state.completed});
      } else {
        return state;
      }
    default:
      return state;
  }
};

/* Todos arr reducer */
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

export default todos;

export const getVisibleTodos = (state, filter) => {
  switch(filter) {
    case 'all':
      return state;
    case 'active':
      return state.filter(todo => !todo.completed);
    case 'completed':
      return state.filter(todo => todo.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};
