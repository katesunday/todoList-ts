import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/' ,
    withCredentials: true ,
    headers: {
        'API-KEY': '1ec1e9c7-abf6-4bfd-8f4d-61f7bd79b19a'
    }
})
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        items: D
    }
}
export type GetTasksResponseType = {
    error: null | string
    totalCount: number
    items:  TaskType[]
}

export enum TaskStatuses{
    New = 0,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities{
    Low ,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string,
    title: string,
    description:  string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    addedDate: string

}
export type PropertiesForUpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists/`)
    } ,
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists/` , {title})
    } ,
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/` + id)
    } ,
    updateTodolist(todolistId: string , title: string) {
        return instance.put<ResponseType>(`todo-lists/` + todolistId ,
            {title: title})
    } ,
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/` + todolistId + `/tasks`)
    } ,
    createTask(todolistId: string , title: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/` + todolistId + `/tasks` , {title})
    } ,
    updateTask(todolistId: string , taskId: string  , properties: PropertiesForUpdateTaskType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/` + todolistId + `/tasks/` + taskId , properties)
    } ,
    deleteTask(todolistId: string , taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/` + todolistId + `/tasks/` + taskId)
    }


}
