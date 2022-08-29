import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
// dep: createstore, redux, redux-devtools-extension
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
// dev-tools  - must b removed for dev: redux-devtools-extension, logger
import logger from 'redux-logger'
import { getUsers } from './actions/usersActions'

const store = createStore(
    rootReducer, composeWithDevTools( applyMiddleware( thunk, logger ) )
)

store.dispatch( getUsers() )

const root = ReactDOM.createRoot( document.getElementById( 'root' ) )
root.render(
    <Provider store={ store }>
        < App />
    </Provider>
)