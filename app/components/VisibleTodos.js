import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleTodo } from '../actions';
import Todos from './Todos';
import { getVisibleTodos } from '../reducers';
import { fetchTodos } from '../api';

/* Functions */



/* Component. Second argument is 'ownParams' */

class VisibleTodos extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  render() {
    return <Todos {...this.props} />;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};
VisibleTodos = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(VisibleTodos));

export default VisibleTodos;
