import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers , legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducers} from "../reducers/tasksReducers";
import {todolistsReducer} from "../reducers/todolistsReducer";
import {AppRootStateType} from "../store/store";


const rootReducer = combineReducers({
    tasks: tasksReducers,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: '2', title: "I should be interactive", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) =>{
  return  <Provider store={storyBookStore}>{storyFn()}</Provider>
}

