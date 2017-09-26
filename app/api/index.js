import { v4 } from 'uuid';

const fakeDb = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true
  }, {
    id: v4(),
    text: 'ho',
    completed: false
  }, {
    id: v4(),
    text: 'let\'s go',
    completed: true
  }]
};

const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(1000).then(() => {
    /* Change 1 to 0.1 to test an error handling */
    if (Math.random() > 1) {
      throw new Error('Error.');
    }

    switch (filter) {
      case 'all':
        return fakeDb.todos;
      case 'active':
        return fakeDb.todos.filter(todo => !todo.completed);
      case 'completed':
        return fakeDb.todos.filter(todo => todo.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });

export const addTodo = text =>
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    };
    fakeDb.todos.push(todo);
    return todo;
  });

export const toggleTodo = id =>
  delay(500).then(() => {
    const todo = fakeDb.todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    return todo;
  });
