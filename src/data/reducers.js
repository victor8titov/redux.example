/* 
    Структура хранилища 

    {
    visibilityFilter: 'SHOW_ALL',
    todos: [
      {
        text: 'Consider using Redux',
        completed: true,
      },
      {
        text: 'Keep all state in a single tree',
        completed: false
      }
    ]
  } 
  
*/
//import { combineReducers } from 'redux'
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from './actions'
const { SHOW_ALL } = VisibilityFilters


const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: [],
}


function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      default:
        return state
    }
  }
  
  function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
      case SET_VISIBILITY_FILTER:
        return action.filter
      default:
        return state
    }
  }
  
  function todoApp(state = initialState, action) {
    return {
      visibilityFilter: visibilityFilter(state.visibilityFilter, action),
      todos: todos(state.todos, action)
    }
  }

  /* 
  Альтернативный код редьюсера

  const todoApp = combineReducers({
        visibilityFilter,
        todos
        })
  
  */
 /* 
 
    Все, что делает combineReducers() — это генерирует функцию, которая вызывает ваши редюсеры, передавая им в качестве одного из аргументов срез глобального состояния, который выбирается в соответствии с именем его ключа в глобальном состоянии, и затем снова собирает результаты всех вызовов в один объект. Тут нет никакой магии.
  
    
 */

export default todoApp