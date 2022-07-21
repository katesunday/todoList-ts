import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {Dispatch} from "redux";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {createSlice , PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStateType = string | null

const initialState = {
    status: 'loading' as RequestStatusType,
    error:null as ErrorStateType,
    isInitialized:false
}

const slice = createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        setAppStatusAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state,action:PayloadAction<{error:ErrorStateType}>){
            state.error = action.payload.error
        },
        setIsInitializedAC(state,action:PayloadAction<{isInitialized:boolean}>){
            state.isInitialized = action.payload.isInitialized
        }
    }
})


export const appReducer = slice.reducer
export const {setAppStatusAC,setAppErrorAC,setIsInitializedAC} = slice.actions


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}));
        } else {
            handleServerAppError(res.data , dispatch)
            dispatch(setAppStatusAC({status:'failed'}))
        }
    })
        .catch((error)=>{
            handleServerNetworkError(error,dispatch)
            dispatch(setAppStatusAC({status:'failed'}))
        })
        .finally(()=>{
            dispatch(setIsInitializedAC({isInitialized:true}))
        })
}





