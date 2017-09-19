import Todos from './Todos';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers';

/* Functions */

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

/* Component. Second argument is 'ownParams' */

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all')
});
const VisibleTodos = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(Todos));

export default VisibleTodos;
