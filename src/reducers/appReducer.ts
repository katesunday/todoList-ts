import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {Dispatch} from "redux";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStateType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error:null as ErrorStateType,
    isInitialized:false
}

export type InitialStateType = typeof initialState

export type ActionsAppType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> |
    ReturnType<typeof setIsInitializedAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionsAppType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case "APP/SET-ERROR":
            return {...state, error:action.payload.error}
        case "APP/SET-IS-INITIALIZED":{
            return {...state,isInitialized: action.payload.isInitialized}
        }
        default:
            return state
    }
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsInitializedAC(true))
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res.data , dispatch)
            dispatch(setAppStatusAC('failed'))
            dispatch(setIsInitializedAC(true))
        }
    })
        .catch((error)=>{
            dispatch(setIsInitializedAC(true))
            handleServerNetworkError(error,dispatch)
            dispatch(setAppStatusAC('failed'))
        })
}


export const setAppStatusAC = (status:RequestStatusType)=>{
    return {
        type:'APP/SET-STATUS',
        payload:{status}
    }as const
}

export const setAppErrorAC = (error:ErrorStateType)=>{
    return{
        type:'APP/SET-ERROR',
        payload:{error}
    }as const
}

export const setIsInitializedAC = (isInitialized:boolean)=>{
    return{
        type:'APP/SET-IS-INITIALIZED',
        payload:{isInitialized}
    }as const
}



