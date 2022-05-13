import {FilterValuesType , TodolistsType} from "../App";
import {todolistID1 , todolistID2} from "./tasksReducers";

const initialState: Array<TodolistsType> = [
    // {id: todolistID1 , title: 'What to learn' , filter: 'all'} ,
    // {id: todolistID2 , title: 'What to buy' , filter: 'all'} ,
]
export const todolistsReducer = (state: Array<TodolistsType> = initialState , action: todolistsReducerACType): Array<TodolistsType> => {
    switch (action.type) {
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
export const addNewTodoListAC = (title: string , newID: string) => {
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

//другой тип описание АС
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     id: string
// }
// export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return { type: 'REMOVE-TODOLIST', id: todolistId}
// }