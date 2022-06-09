import {todolistAPI , TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType , setAppErrorAC , setAppStatusAC} from "./appReducer";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1 , title: 'What to learn' , filter: 'all',   addedDate: '',order: 0,} ,
    // {id: todolistID2 , title: 'What to buy' , filter: 'all'} ,
]

type todolistsReducerACType = filterReducerACType |
    updateTodoListTitleACType | addNewTodoListACType |
    removeTodoListACType | setTodolistsACType |
    ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC> |
    changeTodolistEntityStatusACType


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState , action: todolistsReducerACType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST": {
            let todolist: TodolistDomainType = {
                id: action.payload.newID ,
                title: action.payload.title ,
                filter: 'all' ,
                addedDate: '' ,
                order: 0 ,
                entityStatus: 'succeeded'
            }
            return [todolist , ...state]
        }
        case "CHANGE-FILTER": {
            return state.map((el) => el.id === action.payload.todolistID ? {...el , filter: action.payload.value} : el)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map((el) => el.id === action.payload.todolistID ?
                {...el , title: action.payload.title} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case "SET-TODOLISTS": {
            // добавить фильтр в каждый тудулист, так как это только для UI
            return action.payload.todolists.map((el) => (
                {
                    ...el , filter: 'all' , entityStatus: 'succeeded'
                }))
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map((el) => el.id === action.payload.id ?
                {...el , entityStatus: action.payload.entityStatus} : el)
        }

        default:
            return state
    }
}


type filterReducerACType = ReturnType<typeof filterReducerAC>
export const filterReducerAC = (todolistID: string , value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER' ,
        payload: {todolistID , value}
    } as const
}

type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todolistID: string , title: string) => {
    return {
        type: "UPDATE-TODOLIST-TITLE" ,
        payload: {todolistID , title}
    } as const
}

export type addNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export const addNewTodoListAC = (title: string,newID:string) => {
    return {
        type: "ADD-NEW-TODOLIST" ,
        payload: {title , newID}
    } as const
}

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST" ,
        payload: {todolistID}
    } as const
}

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS' ,
        payload: {todolists}
    } as const
}

export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>
export const changeTodolistEntityStatusAC = (id: string , entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS' ,
        payload: {id , entityStatus}
    } as const
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<todolistsReducerACType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.getTodolists()
            .then((res) => {
                if (res.status === 200) {
                    dispatch(setTodolistsAC(res.data))
                    dispatch(setAppStatusAC('succeeded'))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message , dispatch)

            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<todolistsReducerACType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addNewTodoListAC(title,res.data.data.item.id))
                    dispatch(setAppStatusAC('loading'))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                console.log(error)
                handleServerNetworkError(error.message , dispatch)

            })
    }
}

export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistID , 'loading'))
        todolistAPI.deleteTodolist(todolistID)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC(todolistID))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTodolistEntityStatusAC(todolistID , 'succeeded'))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message , dispatch)

            })
    }
}

export const changeTodolistTitleTC = (todolistID: string , title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistAPI.updateTodolist(todolistID , title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTodoListTitleAC(todolistID , title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data , dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message , dispatch)

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