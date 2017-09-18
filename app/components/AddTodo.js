import React from 'react';
import { v4 } from 'uuid';
import { connect } from 'react-redux';

const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
});

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

export default AddTodo;
