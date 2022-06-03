import React , {useEffect , useState} from "react";
import {
    PropertiesForUpdateTaskType , TaskType ,
    todolistAPI ,
} from "../api/todolist-api";

export default {
    title: 'TASKS-TODOLISTS'
}
export const GetTasks = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6cf325d4-0fac-4275-98f0-c03183716244'
        const todolistId2 = '0dd11ee8-ee31-45db-95eb-6cbf6f3e6de3'
        const todolistId3 = '3bf5a8ec-2240-43eb-b605-2ad0957ec1fe'
        todolistAPI.getTasks(todolistId3)
            .then(res => {
                setState(res.data)
            })
    } , [])
    return <div> {state ?
        <li>
            <p> totalCount: {JSON.stringify(state.totalCount)}</p>
            <p> error: {JSON.stringify(state.error)}</p>
            {state.items.map((el: TaskType) => {
                return <ol>
                    <li>
                        <p> id: {el.id}</p>
                        <p> title: {el.title}</p>
                        <p> todoListId: {el.todoListId}</p>
                        <p> deadline: {el.deadline}</p>
                        <p> addedDate: {el.addedDate}</p>
                        <p> order: {el.order}</p>
                        <p> description: {el.description}</p>
                        <p> priority: {el.priority}</p>
                        <p> startDate: {el.startDate}</p>
                        <p> status: {el.status}</p>
                    </li>
                </ol>
            })})

        </li>
        : state}</div>

}
export const CreateTasks = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6cf325d4-0fac-4275-98f0-c03183716244'
        const todolistId2 = '0dd11ee8-ee31-45db-95eb-6cbf6f3e6de3'
        const todolistId3 = '3bf5a8ec-2240-43eb-b605-2ad0957ec1fe'
        todolistAPI.createTask(todolistId3 , 'new Task')
            .then(res => {
                setState(res.data)
            })
    } , [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state , setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '6cf325d4-0fac-4275-98f0-c03183716244'
        const taskId = '0c1994f7-cacc-47c4-a180-3394769b7290'
        const properties: PropertiesForUpdateTaskType = {
            title: 'new Title' ,
            description: '' ,
            status: 0 ,
            priority: 0 ,
            startDate: new Date().toDateString() ,
            deadline: '' ,
        }
        todolistAPI.updateTask(todolistId , taskId , properties)
            .then(res => {
                setState(res.data)
            })
    } , [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state , setState] = useState<any>(null)
    const todolistId = '6cf325d4-0fac-4275-98f0-c03183716244'
    const taskId = 'be457a82-8f99-4263-ab78-f5bc53628ae9'
    useEffect(() => {
        todolistAPI.deleteTask(todolistId , taskId)
            .then(res => {
                setState(res.data)
            })
    } , [])


    return <div> {JSON.stringify(state)}</div>
}
