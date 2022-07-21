import {todolistAPI , TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType , setAppStatusAC} from "./appReducer";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {fetchTasksTC} from "./tasksReducers";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../store/store";
import {createSlice , PayloadAction} from "@reduxjs/toolkit";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1 , title: 'What to learn' , filter: 'all',   addedDate: '',order: 0,} ,
    // {id: todolistID2 , title: 'What to buy' , filter: 'all'} ,
]

const slice = createSlice({
    name: 'todolists' ,
    initialState: initialState ,
    reducers: {
        changeTodolistFilterAC(state , action: PayloadAction<{ todolistID: string, value: FilterValuesType }>) {
            const index = state.findIndex(el=>el.id === action.payload.todolistID)
            state[index].filter = action.payload.value
            //state.map(el => el.id === action.payload.todolistID ? {...el , filter: action.payload.value} : el)
        } ,
        updateTodoListTitleAC(state,action:PayloadAction<{todolistID: string , title: string}>) {
            const index = state.findIndex(el=>el.id === action.payload.todolistID)
            state[index].title = action.payload.title
            //state.map((el) => el.id === action.payload.todolistID ? {...el , title: action.payload.title} : el)
        } ,
        addNewTodoListAC(state,action:PayloadAction<{title: string , newID: string}>) {
            let todolist: TodolistDomainType = {
                id: action.payload.newID ,
                title: action.payload.title ,
                filter: 'all' ,
                addedDate: '' ,
                order: 0 ,
                entityStatus: 'idle'
            }
            state.unshift(todolist)
        } ,
        removeTodoListAC(state,action:PayloadAction<{todolistID: string}>) {
            const index = state.findIndex(el=>el.id === action.payload.todolistID)
            if(index>-1){
                state.splice(index,1)
            }
            //state.filter(el => el.id !== action.payload.todolistID)
        } ,
        setTodolistsAC(state,action:PayloadAction<{todolists: TodolistType[]}>) {
          return action.payload.todolists.map((el) => ({...el , filter: 'all' , entityStatus: 'idle'}))
        } ,
        changeTodolistEntityStatusAC(state,action:PayloadAction<{id: string , entityStatus: RequestStatusType}>) {
            const index = state.findIndex(el=>el.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
            //state.map((el) => el.id === action.payload.id ?{...el , entityStatus: action.payload.entityStatus} : el)
        } ,
        clearTodolistsDataAC(state) {
           return  state = []
        }
    }
})

export const todolistsReducer = slice.reducer
export const {
    changeTodolistFilterAC , updateTodoListTitleAC ,
    addNewTodoListAC , removeTodoListAC , setTodolistsAC ,
    changeTodolistEntityStatusAC , clearTodolistsDataAC
} = slice.actions


export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch<AppRootStateType , unknown , any>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodolists()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setTodolistsAC({todolists:res.data}))
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

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addNewTodoListAC({title:title , newID: res.data.data.item.id}))
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

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC({id:todolistID ,entityStatus: 'loading'}))
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC({todolistID:todolistID}))
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

export const changeTodolistTitleTC = (todolistID: string , title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.updateTodolist(todolistID , title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTodoListTitleAC({todolistID: todolistID ,title: title}))
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