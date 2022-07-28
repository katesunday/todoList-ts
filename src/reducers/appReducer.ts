import {authAPI} from "../api/todolist-api";
import {loginTC} from "./auth-reducer";
import {Dispatch} from "redux";
import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorStateType = string | null


export const initializeAppTC = createAsyncThunk('app/initializeApp' , async (param , {dispatch}) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(loginTC.fulfilled(undefined , '' , {email: '' , password: ''}));
        } else {
            //handleServerAppError(res.data , dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    } catch (e) {
        //handleServerNetworkError(error,dispatch)
        dispatch(setAppStatusAC({status: 'failed'}))
    }
})
const slice = createSlice({
    name: 'app' ,
    initialState: {
        status: 'loading' as RequestStatusType ,
        error: null as ErrorStateType ,
        isInitialized: false
    } ,
    reducers: {
        setAppStatusAC(state , action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        } ,
        setAppErrorAC(state , action: PayloadAction<{ error: ErrorStateType }>) {
            state.error = action.payload.error
        } ,
    } ,
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled , (state , action) => {
            state.isInitialized = true
        })
    }
})


export const appReducer = slice.reducer
export const {setAppStatusAC , setAppErrorAC} = slice.actions


export const initializeAppTC_ = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(loginTC.fulfilled(undefined , '' , {email: '' , password: ''}));
        } else {
            //handleServerAppError(res.data , dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        }
    })
        .catch((error) => {
            //handleServerNetworkError(error,dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        })
        .finally(() => {
            // dispatch(setIsInitializedAC({isInitialized: true}))
        })
}





