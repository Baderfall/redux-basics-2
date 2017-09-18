import Todos from './Todos';
import { connect } from 'react-redux';

/* Functions */

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

/* Component */

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, ownProps.filter)
});
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});
const VisibleTodos = connect(
  mapStateToProps,
  mapDispatchToProps
)(Todos);

export default VisibleTodos;
