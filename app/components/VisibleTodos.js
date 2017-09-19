import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as actions from '../actions';
import Todos from './Todos';
import { getVisibleTodos } from '../reducers';


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
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { toggleTodo, ...rest } = this.props;
    return <Todos onTodoClick={toggleTodo} {...rest} />;
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
  actions
)(VisibleTodos));

export default VisibleTodos;
