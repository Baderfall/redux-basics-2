import React from 'react';
import { connect, Provider } from 'react-redux';
import { v4 } from 'uuid';

const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed);
  }
};



/* COMPONENTS */

/* AddTodo. Second argument is a context. */
let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={e => {
        input = e;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        input.value = '';
      }}>Add todo</button>
    </div>
  );
};
AddTodo = connect()(AddTodo);

/* VisibleTodos => Todos => Todo */

const Todo = ({ text, completed, onClick }) => (
  <li
    style={{textDecoration: completed ? 'line-through' : 'none'}}
    onClick={onClick}
  >{text}</li>
);

const Todos = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo {...todo} key={todo.id} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
);

const mapStateToTodosProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodosProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  }
});
const VisibleTodos = connect(
  mapStateToTodosProps,
  mapDispatchToTodosProps
)(Todos);

/* Filters => FilterLink => Link */
const Filters = () => (
  <p>
    Show:{' '}
    <FilterLink filter="SHOW_ALL">All</FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);

const Link = ({onClick, children, isActive}) => {
  if (isActive) {
    return <span>{children}</span>;
  } else {
    return (
      <a href="#"
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      >{children}</a>
    );
  }
};
const mapStateToLinkProps = (state, ownProps) => ({
  isActive: ownProps.filter === state.visibilityFilter
});
const mapDispatchToLinkProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  }
});
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);


/* RENDER */

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodos />
    <Filters />
  </div>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
);

export default Root;
