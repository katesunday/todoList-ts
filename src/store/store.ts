import {applyMiddleware , combineReducers , createStore} from "redux";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {tasksReducers} from "../reducers/tasksReducers";
import thunk from "redux-thunk";
import {appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook , useSelector} from "react-redux";
import {authReducer} from "../reducers/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducers,
    app:appReducer,
    auth:authReducer
})
 export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector:TypedUseSelectorHook<AppRootStateType> = useSelector
export const store = createStore(rootReducer,applyMiddleware(thunk))