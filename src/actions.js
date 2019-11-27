
import fetch from 'cross-fetch'

const URL = 'http://localhost:3000';

//тип экшена
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

//генератор экшена
export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}


// Также пользователь может нажать кнопку "обновить" для обновления:
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

// Когда нужно будет фетчить посты для какого-нибудь subreddit'a мы будем посылать экшен REQUEST_POSTS:
export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

// Наконец, когда сетевой запрос будет осуществлен, мы отправим экшен RECEIVE_POSTS:
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// Тут мы встречаемся с нашим первым thunk-генератором экшена!
// Хотя его содержимое отличается, вы должны использовать его, как и любой другой генератор экшенов:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

    // Thunk middleware знает, как обращаться с функциями.
    // Он передает метод dispatch в качестве аргумента функции,
    // т.к. это позволяет отправить действие самостоятельно.
  
    return function (dispatch) {
  
      // Первая отправка: состояние приложения обновлено, 
      // чтобы сообщить, что запускается вызов API.
  
      dispatch(requestPosts(subreddit))
  
      // Функция, вызываемая Thunk middleware, может возвращать значение, 
      // которое передается как возвращаемое значение метода dispatch.
  
      // В этом случае мы возвращаем promise.
      // Thunk middleware не требует этого, но это удобно для нас.
        console.log(`${URL}/subreddit_${subreddit}.json`)
      return fetch(`${URL}/subreddit_${subreddit}.json`)
        .then(
          response => response.json(),
          // Не используйте catch, потому что это также                 // перехватит любые ошибки в диспетчеризации и                  // в результате рендеринга, что приведет к                         // циклу ошибок «Unexpected batch number».
          // https://github.com/facebook/react/issues/6895
          error => console.log('An error occurred.', error)
        )
        .then(json =>
          // Мы можем вызывать dispatch много раз!
          // Здесь мы обновляем состояние приложения с результатами вызова API.
  
          dispatch(receivePosts(subreddit, json))
        )
    }
  }

  function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit]
    if (!posts) {
      return true
    } else if (posts.isFetching) {
      return false
    } else {
      return posts.didInvalidate
    }
  }
  
  export function fetchPostsIfNeeded(subreddit) {
  
    // Помните, что функция также получает getState(),
    // который позволяет вам выбрать, что отправить дальше.
  
    // Это полезно для того, чтобы избежать сетевого запроса,
    // если доступно закешированное значение.
  
    return (dispatch, getState) => {
      if (shouldFetchPosts(getState(), subreddit)) {
        // Диспатчим thunk из thunk!
        return dispatch(fetchPosts(subreddit))
      } else {
        // Дадим вызвавшему коду знать, что ждать нечего.
        return Promise.resolve()
      }
    }
  }