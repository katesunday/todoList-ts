import {applyMiddleware , combineReducers , createStore} from "redux";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {tasksReducers} from "../reducers/tasksReducers";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/appReducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducers,
    app:appReducer
})
 export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunk))