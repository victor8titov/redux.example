import { createStore } from 'redux'
import todoApp from './reducers'




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