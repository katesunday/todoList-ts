import React , {useEffect , useState} from 'react'
import {todolistAPI , TodolistType} from "../api/todolist-api";

export default {
    title: 'API-TODOLISTS'
}

export const GetTodolists = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })


    } , [])


    return <div> {state ? state.map((el: TodolistType) => {
            return <li>title: {el.title}
                <p> id: {el.id}</p>
                <p> added date: {el.addedDate}</p>
                <p> order: {el.order}</p>
            </li>
        }) :
        state}</div>
}
export const CreateTodolist = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('new todolist')
            .then((res) => {
                setState(res.data);
            })

    } , [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'eee76d5d-f75a-483b-8391-b4b349db3b38';
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })

    } , [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state , setState] = useState<any>(null)

    useEffect(() => {
        const someId = '3bf5a8ec-2240-43eb-b605-2ad0957ec1fe'
        todolistAPI.updateTodolist(someId , 'some new title')
            .then(res => {
                setState(res.data)
            })
    } , [])

    return <div> {JSON.stringify(state)}</div>
}
