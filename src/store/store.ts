import {AnyAction , combineReducers} from "redux";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {tasksReducers} from "../reducers/tasksReducers";
import thunk , {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../reducers/appReducer";
import {TypedUseSelectorHook , useDispatch , useSelector} from "react-redux";
import {authReducer} from "../reducers/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer ,
    tasks: tasksReducers ,
    app: appReducer ,
    auth: authReducer
})
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = configureStore({
    reducer: rootReducer ,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

type DispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<DispatchType>()

//@ts-ignore
window.store = store