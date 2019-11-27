import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { selectSubreddit, fetchPosts, invalidateSubreddit } from './actions'
import rootReducer from './reducers'
import { preloadedState } from './state_ex';

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer, preloadedState,
  applyMiddleware(
    thunkMiddleware, // позволяет нам отправлять функции
    loggerMiddleware // аккуратно логируем действия
  )
)

console.log('-:','Состояние после инициализации: ',store.getState())
store.dispatch(selectSubreddit('reactjs'))
store.dispatch(invalidateSubreddit('frontend'))
store.dispatch(fetchPosts('example')).then(() => console.log(store.getState()))

/* 

store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()))

*/


