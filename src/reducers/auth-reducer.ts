import {Dispatch} from 'redux'
import {ActionsAppType , setAppStatusAC} from "./appReducer";
import {authAPI , LoginParamsType , todolistAPI} from "../api/todolist-api";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

// types
type ActionsAuthType = ReturnType<typeof setIsLoggedInAC> | ActionsAppType

type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState , action: ActionsAuthType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state , isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    (
        {type: 'login/SET-IS-LOGGED-IN' , value} as const)

// thunks
export const loginTC = (data:LoginParamsType) =>
    (dispatch: Dispatch<ActionsAuthType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data , dispatch)
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error)=>{
                handleServerNetworkError(error,dispatch)
                dispatch(setAppStatusAC('failed'))
            })

    }

export const logoutTC = () => (dispatch: Dispatch<ActionsAuthType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



