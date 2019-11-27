import { connect } from 'react-redux'
import { toggleTodo } from '../data/actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    state: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      console.log('-:','ontodoClick',id)
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList

/* 

Чтобы использовать connect(), вам нужно определить специальную функцию mapStateToProps, которая говорит, как трансформировать текущее Redux-состояние стора в props, которые вы хотите передать в оборачиваемое (контейнером) представление. Например, VisibleTodoList требуется вычислить todos для передачи в TodoList, так что нам нужно определить функцию, которая фильтрует state.todos согласно state.visibilityFilter, и использовать ее в mapStateToProps:

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

В дополнение к чтению состояния контейнеры могут отправлять действия (dispatch actions). В похожем стиле вы можете определить функцию mapDispatchToProps(), которая получает метод dispatch() и возвращает колбек props, который вы можете вставить в представление. Например, мы хотим, чтобы контейнер VisibleTodoList вставил prop onTodoClick в представление TodoList и еще мы хотим, чтобы onTodoClick отправлял TOGGLE_TODO действие:

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

*/