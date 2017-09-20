const createList = filter => {
  /* state === arr of ids */
  return (state = [], action) => {
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
};

export default createList;

/* state === arr of ids */
export const getIds = state => state;
