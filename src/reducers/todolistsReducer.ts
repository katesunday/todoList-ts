import {todolistAPI , TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [
    // {id: todolistID1 , title: 'What to learn' , filter: 'all',   addedDate: '',order: 0,} ,
    // {id: todolistID2 , title: 'What to buy' , filter: 'all'} ,
]

type todolistsReducerACType = filterReducerACType |
    updateTodoListTitleACType | addNewTodoListACType |
    removeTodoListACType | setTodolistsACType


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState , action: todolistsReducerACType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST": {
            let todolist: TodolistDomainType = {
                id: action.payload.newID ,
                title: action.payload.title ,
                filter: 'all' ,
                addedDate: '' ,
                order: 0 ,
            }
            return [todolist , ...state]
        }
        case "CHANGE-FILTER": {
            return state.map((el) => el.id === action.payload.todolistID ? {...el , filter: action.payload.value} : el)
        }
        case "UPDATE-TODOLIST-TITLE": {
            return state.map((el) => el.id === action.payload.todolistID ? {...el , title: action.payload.title} : el)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        case "SET-TODOLISTS":{
            // добавить фильтр в каждый тудулист, так как это только для UI
            return action.payload.todolists.map((el)=>({
                ...el,filter:'all'
            }))
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
export const addNewTodoListAC = (title: string ) => {
    const newID = v1()
    return {
        type: "ADD-NEW-TODOLIST" ,
        payload: {title,newID }
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
        type:'SET-TODOLISTS',
        payload:{todolists}
    }as const
}

export const fetchTodolistsTC = ()=>{
    return(dispatch:Dispatch)=>{
        todolistAPI.getTodolists()
            .then((res)=>{
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const addTodolistTC = (title:string)=>{
    return(dispatch:Dispatch)=>{
        todolistAPI.createTodolist(title)
            .then((res)=>{
                dispatch(addNewTodoListAC(title))
            })
    }
}
export const removeTodolistTC = (todolistID:string)=>{
    return(dispatch:Dispatch)=>{
        todolistAPI.deleteTodolist(todolistID)
            .then((res)=>{
                dispatch(removeTodoListAC(todolistID))
            })
    }
}

export const changeTodolistTitleTC = (todolistID:string,title:string)=>{
    return(dispatch:Dispatch)=>{
        todolistAPI.updateTodolist(todolistID,title)
            .then((res)=>{
                dispatch(updateTodoListTitleAC(todolistID,title))
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