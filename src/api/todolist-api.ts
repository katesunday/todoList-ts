import axios , {AxiosResponse} from 'axios'

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
export type FieldErrorType = {field:string,error:string}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: FieldErrorType
    data: {
        item: D
    }
}
export type GetTasksResponseType = {
    error: null | string
    totalCount: number
    items: TaskType[]
}

export enum TaskStatuses {
    New = 0 ,
    InProgress ,
    Completed ,
    Draft
}

export enum TaskPriorities {
    Low ,
    Middle ,
    Hi ,
    Urgently ,
    Later
}

export type TaskType = {
    id: string,
    title: string,
    description: string | null,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string | null,
    deadline: string | null,
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
export type LoginParamsType = {
    email:string
    password:string
    rememberMe?:boolean
    captcha?:string
}
export type AuthMeType = {
    id:number
    email:string
    login:string
}

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>(`todo-lists/`)
    } ,
    createTodolist(title: string) {
        return instance.post<ResponseType<TodolistType>>(`todo-lists/` , {title})
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
        return instance.post<ResponseType<TaskType>>(`todo-lists/` + todolistId + `/tasks` , {title})
    } ,
    updateTask(todolistId: string , taskId: string , properties: PropertiesForUpdateTaskType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/` + todolistId + `/tasks/` + taskId , properties)
    } ,
    deleteTask(todolistId: string , taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/` + todolistId + `/tasks/` + taskId)
    }


}


export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthMeType>>(`auth/me`)
    },
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType,AxiosResponse<ResponseType>>(`/auth/login` , data)
    } ,
    logout(){
        return instance.delete<ResponseType>(`auth/login`)
    }
}
