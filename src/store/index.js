import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {postReducer} from "./reducers/post";

const rootReduser = combineReducers({
    post: postReducer
})

export default createStore(rootReduser, applyMiddleware(ReduxThunk))