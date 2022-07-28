import {Dispatch} from 'redux'
import {setAppStatusAC} from "./appReducer";
import {authAPI , FieldErrorType , LoginParamsType} from "../api/todolist-api";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {clearTodolistsDataAC} from "./todolistsReducer";
import {createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const loginTC = createAsyncThunk<undefined,LoginParamsType,
    {rejectValue:{errors:string[],fieldsErrors?:FieldErrorType}}>('auth/login' , async (data: LoginParamsType , thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data , thunkAPI.dispatch)
            thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
            return thunkAPI.rejectWithValue({errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
    }
})

export const logoutTC = createAsyncThunk('auth/logout' , async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            // thunkAPI.dispatch(setIsLoggedInAC({value: false}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(clearTodolistsDataAC())
            return
        } else {
            handleServerAppError(res.data , thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})

        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({})
    }
})

const slice = createSlice({
    name: 'auth' ,
    initialState: {isLoggedIn: false} ,
    reducers: {
        // setIsLoggedInAC(state , action: PayloadAction<{ value: boolean }>) {
        //     state.isLoggedIn = action.payload.value
        // }
    } ,
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled , (state , action) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled,(state,action)=>{
            state.isLoggedIn = false
        })
    }
})


export const authReducer = slice.reducer
//export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC_ = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                //dispatch(setIsLoggedInAC({value:true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data , dispatch)
                dispatch(setAppStatusAC({status: 'failed'}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error , dispatch)
            dispatch(setAppStatusAC({status: 'failed'}))
        })

}

export const logoutTC_ = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                //dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(clearTodolistsDataAC())
            } else {
                handleServerAppError(res.data , dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error , dispatch)
        })
}



