import {addNewTodoListACType , removeTodoListACType , setTodolistsACType} from "./todolistsReducer";
import { TaskStatuses , TaskType , todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksStateType = {}


type tasksReducersAC = removeTasksACType | addTasksACType | changeTaskStatusACType |
    updateTaskACType | removeTodoListACType | addNewTodoListACType | addNewTodolistACType
    | setTodolistsACType | ReturnType<typeof setTasksAC>

export const tasksReducers = (state: TasksStateType = initialState , action: tasksReducersAC): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASKS": {
            return {...state , [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)}
        }
        case "ADD-TASKS": {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.task.todoListId]
            // const newTasks = [action.task,...tasks]
            // stateCopy[action.task.todoListId] = newTasks
            return {
                ...state ,
                [action.payload.task.todoListId]: [action.payload.task , ...state[action.payload.task.todoListId]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state , [action.payload.todolistID]:
                    state[action.payload.todolistID].map(el => el.id === action.payload.taskID ?
                        {...el , status: action.payload.status} : el)
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state ,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ?
                    {...el , title: action.payload.updateTitle} : el)
            }
        }
        case "ADD-NEW-TODOLIST": {
            return {...state , [action.payload.newID]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        }
        case "SET-TODOLISTS": {
            // добавить в каждому тудулисту массив пустых тасок
            const stateCopy = {...state}
            action.payload.todolists.forEach((el) => {
                stateCopy[el.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistID] = action.payload.tasks
            return stateCopy
        }

        default:
            return state
    }

}


type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistID: string , taskID: string) => {
    return {
        type: "REMOVE-TASKS" ,
        todolistID: todolistID ,
        taskID: taskID
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (task:TaskType) => {
    return {
        type: "ADD-TASKS" ,
        payload: {task}
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string , taskID: string , status: TaskStatuses) => {
    return {
        type: "CHANGE-TASK-STATUS" ,
        payload: {todolistID , taskID , status}
    } as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string , taskID: string , updateTitle: string) => {
    return {
        type: "UPDATE-TASK" ,
        payload: {todolistID , taskID , updateTitle}
    } as const
}

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (newID: string) => {
    return {
        type: "ADD-NEW-TODOLIST" ,
        payload: {newID}
    } as const
}

export const setTasksAC = (tasks: TaskType[] , todolistID: string) => {
    return {
        type: 'SET-TASKS' ,
        payload: {tasks , todolistID}
    } as const
}

export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistID)
            .then((res) => {
                dispatch(setTasksAC(res.data.items , todolistID))
            })
    }
}

export const addTaskTC = (todolistID:string,title:string)=>{
    return(dispatch: Dispatch)=>{
        todolistAPI.createTask(todolistID,title)
            .then((res)=>{
                dispatch(addTasksAC(res.data.data.items.item))
            })
    }
}

export const removeTaskTC = (todolistID:string,taskId:string)=>{
    return(dispatch: Dispatch)=>{
        todolistAPI.deleteTask(todolistID,taskId)
            .then((res)=>{
                dispatch(removeTasksAC(todolistID,taskId))
            })
    }
}

export const changeTaskStatusTC = (todolistID:string,taskId:string,status:TaskStatuses)=>{
    return (dispatch: Dispatch,getState: () => AppRootStateType)=>{
     const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistID]
        const task = tasksForCurrentTodolist.find((el)=>{
            return el.id === taskId
        })
        if(task){
            todolistAPI.updateTask(todolistID,taskId,{
                title: task.title,
                description: task.description,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            })
                .then((res)=>{
                    dispatch(changeTaskStatusAC(todolistID,taskId,status))
                })
        }
    }
}

export const changeTaskTitleTC = (todolistID:string,taskId:string,title:string)=>{
    return(dispatch: Dispatch,getState: () => AppRootStateType)=>{
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistID]
        const task = tasksForCurrentTodolist.find((el)=>{
            return el.id === taskId
        })
        if(task){
            todolistAPI.updateTask(todolistID,taskId,{
                title: title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline
            })
                .then((res)=>{
                    dispatch(updateTaskAC(todolistID,taskId,title))
                })
        }
    }
}



