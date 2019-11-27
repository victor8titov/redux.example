/* 
	---   Компоненты-представления    ---

  Из этого брифа получаются следующие представления и их props:

    TodoList — список, показывающий видимые todos.
        todos: Array — массив todo-объектов, имеющих форму { id, text, completed }.
        onTodoClick(id: number) — колбек, который будет вызван при клике на todo.
    Todo — отдельный todo.
        text: string — текст для отображения.
        completed: boolean — должен ли todo показываться зачеркнутым.
        onClick() — колбек, который будет вызван при клике на todo.
    Link — ссылка с колбеком.
        onClick() — колбек, который будет вызван при клике на ссылку.
    Footer — область, где мы позволим пользователю менять текущую видимость todos.
    App — корневой компонент, который рендерит все остальное.

Они описывают вид, но не знают откуда приходят данные или как изменить их. Они только рендерят то, что им дают. Если вы мигрируете с Redux на что-нибудь другое, вы сможете оставить эти компоненты точно такими же. Они не зависят от Redux




	---		Компоненты-контейнеры	---

Нам также потребуются некоторые контейнеры, чтобы соединить представления с Redux. Например, представлению TodoList требуется контейнер VisibleTodoList, который подписывается на Redux-стор и знает, как применять текущий фильтр видимости. Чтобы изменить фильтр видимости, мы предоставим представлению FilterLink, контейнер, который рендерит Link, а тот, в свою очередь, отправляет (dispatches) соответствующее действие при клике:

    VisibleTodoList — фильтрует todos согласно текущему фильтру видимости и рендерит TodoList.
    FilterLink — получает текущий фильтр видимости и рендерит Link.
        filter: string — текущий фильтр видимости.

 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './data/reducers'
import App from './components/App'



let store = createStore(todoApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

