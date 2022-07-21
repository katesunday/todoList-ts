import {Dispatch} from 'redux'
import { setAppStatusAC} from "./appReducer";
import {authAPI , LoginParamsType } from "../api/todolist-api";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {clearTodolistsDataAC} from "./todolistsReducer";
import {createSlice , PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setIsLoggedInAC(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})


export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data:LoginParamsType) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value:true}))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                    dispatch(setAppStatusAC({status:'failed'}))
                }
            })
            .catch((error)=>{
                handleServerNetworkError(error,dispatch)
                dispatch(setAppStatusAC({status:'failed'}))
            })

    }

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}



