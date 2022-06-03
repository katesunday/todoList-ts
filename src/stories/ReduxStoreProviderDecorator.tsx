import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers , legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducers} from "../reducers/tasksReducers";
import { todolistsReducer} from "../reducers/todolistsReducer";
import {AppRootStateType} from "../store/store";
import {TaskPriorities , TaskStatuses} from "../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducers ,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1" , title: "What to learn" , filter: "all" , addedDate: '' , order: 0 ,} ,
        {id: "todolistId2" , title: "What to buy" , filter: "all" , addedDate: '' , order: 0 ,}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: '2' ,
                title: "I should be interactive" ,
                status: TaskStatuses.New ,
                description: '' ,
                todoListId: 'todolistId1' ,
                order: 0 ,
                priority: TaskPriorities.Low ,
                startDate: '' ,
                deadline: '' ,
                addedDate: ''
            } ,
            {
                id: v1() , title: "JS" , status: TaskStatuses.New ,
                description: '' ,
                todoListId: 'todolistId1' ,
                order: 0 ,
                priority: TaskPriorities.Low ,
                startDate: '' ,
                deadline: '' ,
                addedDate: ''
            }
        ] ,
        ["todolistId2"]: [
            {
                id: v1() ,
                title: "Milk" ,
                status: TaskStatuses.New ,
                description: '' ,
                todoListId: 'todolistId2' ,
                order: 0 ,
                priority: TaskPriorities.Low ,
                startDate: '' ,
                deadline: '' ,
                addedDate: ''
            } ,
            {
                id: v1() ,
                title: "React Book" ,
                status: TaskStatuses.New ,
                description: '' ,
                todoListId: 'todolistId2' ,
                order: 0 ,
                priority: TaskPriorities.Low ,
                startDate: '' ,
                deadline: '' ,
                addedDate: ''
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer , initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

