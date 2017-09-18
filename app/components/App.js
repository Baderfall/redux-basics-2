import React from 'react';

import AddTodo from './AddTodo';
import VisibleTodos from './VisibleTodos';
import Filters from './Filters';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodos />
    <Filters />
  </div>
);

export default App;
