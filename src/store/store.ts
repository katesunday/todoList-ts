import {applyMiddleware , combineReducers , createStore} from "redux";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {tasksReducers} from "../reducers/tasksReducers";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducers,
})
 export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer,applyMiddleware(thunk))