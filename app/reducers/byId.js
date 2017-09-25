/* state === byId (arr of todos) */
const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos
    };
  }
  return state;
};

export default byId;

/* state === byId (arr of todos) */
export const getTodo = (state, id) => state[id];
