import {FilterValuesType , TodolistsType} from "../App";

export const todolistsReducer = (state: Array<TodolistsType> , action: todolistsReducerACType): Array<TodolistsType> => {
    switch (action.title) {
        case "ADD-NEW-TODOLIST": {
            let todolist: TodolistsType = {id: action.payload.newID , title: action.payload.title , filter: 'all'}
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

        default:
            return state
    }
}

type todolistsReducerACType = filterReducerAC | updateTodoListTitleACType | addNewTodoListACType | removeTodoListACType
type filterReducerAC = ReturnType<typeof filterReducerAC>
export const filterReducerAC = (todolistID: string , value: FilterValuesType) => {
    return {
        title: 'CHANGE-FILTER' ,
        payload: {todolistID , value}
    } as const
}

type updateTodoListTitleACType = ReturnType<typeof updateTodoListTitleAC>
export const updateTodoListTitleAC = (todolistID: string , title: string) => {
    return {
        title: "UPDATE-TODOLIST-TITLE" ,
        payload: {todolistID , title}
    } as const
}
export type addNewTodoListACType = ReturnType<typeof addNewTodoListAC>
export const addNewTodoListAC = (title:string,newID:string)=>{
    return{
        title:"ADD-NEW-TODOLIST",
        payload:{title, newID}
    }as const
}

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export const removeTodoListAC = (todolistID: string) => {
    return {
        title: "REMOVE-TODOLIST" ,
        payload: {todolistID}
    } as const
}
