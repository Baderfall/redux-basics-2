import React from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../actions';

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
