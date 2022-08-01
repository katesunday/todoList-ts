import {todolistAPI , TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType , setAppStatusAC} from "./appReducer";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {fetchTasksTC} from "./tasksReducers";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


export const fetchTodolistsTC_ = createAsyncThunk('todolists/fetchTodolists' , async (param , {
    dispatch ,
    rejectWithValue
}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.getTodolists()
    try {
        if (res.status === 200) {
            // dispatch(setTodolistsAC({todolists:res.data}))
            let todolists = res.data
            dispatch(setAppStatusAC({status: 'succeeded'}))
            // if(todolists) {
            //     todolists && todolists.forEach((el) => {
            //         dispatch(fetchTasksTC(el.id))
            //     })
            // }
            return {todolists}
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , dispatch)
        return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist' , async (title: string , {dispatch,rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todolistAPI.createTodolist(title)
    try {
        if (res.data.resultCode === 0) {
            //dispatch(addNewTodoListAC({title: title , newID: res.data.data.item.id}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
            return {title: title , newID: res.data.data.item.id}

        } else {
            handleServerAppError(res.data , dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , dispatch)
        return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})

    }

})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist',async (todolistID: string,{dispatch,rejectWithValue})=>{
    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
    const res  = await todolistAPI.deleteTodolist(todolistID)
        try {
            if (res.data.resultCode === 0) {
                return {todolistID: todolistID}
            } else {
                handleServerAppError(res.data , dispatch)
                return rejectWithValue({errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
            }
        }
        catch(e){
            const error = e as Error | AxiosError<{ error: string }>
            handleServerNetworkError(error , dispatch)
            return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})
        }
})

export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle',async (param:{todolistID: string , title: string},{dispatch,rejectWithValue}) => {
        dispatch(changeTodolistEntityStatusAC({id:param.todolistID,entityStatus: 'loading'}))
       const res = await todolistAPI.updateTodolist(param.todolistID , param.title)
            try{
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistEntityStatusAC({id:param.todolistID,entityStatus: 'succeeded'}))
                    return {todolistID: param.todolistID , title: param.title}
                } else {
                    handleServerAppError(res.data , dispatch)
                    return rejectWithValue({errors:res.data.messages,fieldsErrors:res.data.fieldsErrors})
                }
            }
            catch(e){
                const error = e as Error | AxiosError<{ error: string }>
                handleServerNetworkError(error , dispatch)
                return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})
            }
})

const slice = createSlice({
    name: 'todolists' ,
    initialState: [] as Array<TodolistDomainType> ,
    reducers: {
        changeTodolistFilterAC(state , action: PayloadAction<{ todolistID: string, value: FilterValuesType }>) {
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            state[index].filter = action.payload.value
            //state.map(el => el.id === action.payload.todolistID ? {...el , filter: action.payload.value} : el)
        } ,
        // updateTodoListTitleAC(state , action: PayloadAction<{ todolistID: string, title: string }>) {
        //     const index = state.findIndex(el => el.id === action.payload.todolistID)
        //     state[index].title = action.payload.title
        //     //state.map((el) => el.id === action.payload.todolistID ? {...el , title: action.payload.title} : el)
        // } ,
        // addNewTodoListAC(state , action: PayloadAction<{ title: string, newID: string }>) {
        //     let todolist: TodolistDomainType = {
        //         id: action.payload.newID ,
        //         title: action.payload.title ,
        //         filter: 'all' ,
        //         addedDate: '' ,
        //         order: 0 ,
        //         entityStatus: 'idle'
        //     }
        //     state.unshift(todolist)
        // } ,
        // removeTodoListAC(state , action: PayloadAction<{ todolistID: string }>) {
        //     const index = state.findIndex(el => el.id === action.payload.todolistID)
        //     if (index > -1) {
        //         state.splice(index , 1)
        //     }
        //     //state.filter(el => el.id !== action.payload.todolistID)
        // } ,
        setTodolistsAC(state , action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map((el) => (
                {...el , filter: 'all' , entityStatus: 'idle'}))
        } ,
        changeTodolistEntityStatusAC(state , action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
            //state.map((el) => el.id === action.payload.id ?{...el , entityStatus: action.payload.entityStatus} : el)
        } ,
        clearTodolistsDataAC(state) {
            return state = []
        }
    } ,
    extraReducers: builder => {
        // builder.addCase(fetchTodolistsTC.fulfilled,(state,action)=>{
        //     action.payload?.todolists.map((el) => ({...el , filter: 'all' , entityStatus: 'idle'}))
        // })
        builder.addCase(addTodolistTC.fulfilled,(state,action)=>{
            let todolist: TodolistDomainType = {
                id: action.payload.newID ,
                title: action.payload.title ,
                filter: 'all' ,
                addedDate: '' ,
                order: 0 ,
                entityStatus: 'idle'
            }
            state.unshift(todolist)
        })
        builder.addCase(removeTodolistTC.fulfilled,(state,action)=>{
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            if (index > -1) {
                state.splice(index , 1)
            }
        })
        builder.addCase(changeTodolistTitleTC.fulfilled,(state,action)=>{
            const index = state.findIndex(el => el.id === action.payload.todolistID)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC  , setTodolistsAC  ,
    changeTodolistEntityStatusAC , clearTodolistsDataAC
} = slice.actions


export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch<AppRootStateType , unknown , any>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodolists()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setTodolistsAC({todolists: res.data}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    return res.data
                }
            })
            .then((todos) => {
                todos && todos.forEach((el) => {
                    dispatch(fetchTasksTC(el.id))
                })
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)

            })
    }
}

export const addTodolistTC_ = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    //dispatch(addNewTodoListAC({title: title , newID: res.data.data.item.id}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)

            })
    }
}

export const removeTodolistTC_ = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    //dispatch(removeTodoListAC({todolistID: todolistID}))
                    //dispatch(changeTodolistEntityStatusAC({id:todolistID ,entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)

            })
    }
}

export const changeTodolistTitleTC_ = (todolistID: string , title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.updateTodolist(todolistID , title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    //dispatch(updateTodoListTitleAC({todolistID: todolistID , title: title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)

            })
    }
}


//другой тип описание АС
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     id: string
// }
// export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE-TODOLIST', id: todolistId}
// }