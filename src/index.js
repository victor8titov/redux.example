import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import todoApp from './data/reducers'
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './data/actions'


ReactDOM.render(<div>Helloy world!</div>, document.getElementById('root'));


let store = createStore(todoApp)


// Выведем в консоль начальное состояние
console.log(store.getState())

// Каждый раз при обновлении состояния - выводим его
// Отметим, что subscribe() возвращает функцию для отмены регистрации слушателя
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// Отправим несколько действий
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))

// Прекратим слушать обновление состояния
unsubscribe()

