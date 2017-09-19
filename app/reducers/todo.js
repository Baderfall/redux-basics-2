/* Single todo reducer (todo, action) */
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

export default todo;
