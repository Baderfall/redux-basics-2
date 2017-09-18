import React from 'react';
import Todo from './Todo';

const Todos = ({todos, onTodoClick}) => (
  <ul>
    {todos.map(todo =>
      <Todo {...todo} key={todo.id} onClick={() => onTodoClick(todo.id)} />
    )}
  </ul>
);

export default Todos;
