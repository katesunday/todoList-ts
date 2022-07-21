import {
    addNewTodoListAC ,
    changeTodolistEntityStatusAC , clearTodolistsDataAC , removeTodoListAC , setTodolistsAC
} from "./todolistsReducer";
import {TaskStatuses , TaskType , todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";
import {RequestStatusType , setAppStatusAC} from "./appReducer";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {createSlice , PayloadAction} from "@reduxjs/toolkit";


export type TaskDomainType = TaskType & {
    taskEntityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>,
}

const initialState: TasksStateType = {}


// export type tasksReducersACType =
//     removeTasksACType
//     | addTasksACType
//     | changeTaskStatusACType
//     |
//     updateTaskACType
//     | addNewTodolistACType
//     | ReturnType<typeof setTasksAC>
//     | ReturnType<typeof changeTaskEntityStatusAC>

const slice = createSlice({
    name: 'tasks' ,
    initialState: initialState ,
    reducers: {
        removeTasksAC(state , action: PayloadAction<{ todolistID: string, taskID: string }>) {
           const tasks =  state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            if(index >-1){
                tasks.splice(index,1)
            }

        } ,
        addTasksAC(state , action: PayloadAction<{ task: TaskType }>) {
            const tasks =  state[action.payload.task.todoListId]
            tasks.unshift({...action.payload.task,taskEntityStatus: 'idle'})

            // state[action.payload.task.todoListId] = [{
            //     ...action.payload.task ,
            //     taskEntityStatus: 'idle'
            // } , ...state[action.payload.task.todoListId]]
        } ,
        changeTaskStatusAC(state , action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatuses }>) {
            const tasks =  state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            tasks[index] = {...tasks[index],status:action.payload.status}

            // state[action.payload.todolistID] =
            //     state[action.payload.todolistID].map(el => el.id === action.payload.taskID ?
            //         {...el , status: action.payload.status} : el)
        } ,
        updateTaskAC(state , action: PayloadAction<{ todolistID: string, taskID: string, updateTitle: string }>) {
            const tasks =  state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            tasks[index] = {...tasks[index],title:action.payload.updateTitle}
            // state[action.payload.todolistID] = state[action.payload.todolistID].map((el) => el.id === action.payload.taskID ?
            //     {...el , title: action.payload.updateTitle} : el)
        } ,
        setTasksAC(state , action: PayloadAction<{ tasks: TaskType[], todolistID: string }>) {
            state[action.payload.todolistID] = action.payload.tasks.map((task) => (
                {...task , taskEntityStatus: 'idle'}))
        } ,
        changeTaskEntityStatusAC(state , action: PayloadAction<{ todolistID: string, id: string, entityStatus: RequestStatusType }>) {
            const tasks =  state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            tasks[index] = {...tasks[index],taskEntityStatus:action.payload.entityStatus}

            // state[action.payload.todolistID] = state[action.payload.todolistID].map((el) =>
            //     el.id === action.payload.id ? {...el , taskEntityStatus: action.payload.entityStatus} : el)
        } ,
    },
    extraReducers:(builder)=>{
        builder.addCase(setTodolistsAC,(state,action)=>{
            action.payload.todolists.forEach((el) => {state[el.id] = []})
        });
        builder.addCase(addNewTodoListAC,(state,action)=>{
            state[action.payload.newID] = []
        })
        builder.addCase(removeTodoListAC,(state,action)=>{
            delete state[action.payload.todolistID]
        })
        builder.addCase(clearTodolistsDataAC,state=>{
           return state = {}
        })
    }
})

export const tasksReducers = slice.reducer
export const {
    changeTaskEntityStatusAC ,
    removeTasksAC ,
    addTasksAC ,
    changeTaskStatusAC ,
    updateTaskAC ,
    setTasksAC
} = slice.actions


export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
        todolistAPI.getTasks(todolistID)
            .then((res) => {
                if (!res.data.error) {
                    dispatch(setTasksAC({tasks:res.data.items , todolistID}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message , dispatch)

            })
    }
}

export const addTaskTC = (todolistID: string , title: string) => {
    return (dispatch: Dispatch) => {
        //dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
        todolistAPI.createTask(todolistID , title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    task && dispatch(addTasksAC({task}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'failed'}))

                }
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)
                dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'failed'}))

            })
    }
}

export const removeTaskTC = (todolistID: string , taskId: string) => {
    return (dispatch: Dispatch) => {
        //dispatch(setAppStatusAC('loading'))
         dispatch(changeTodolistEntityStatusAC({id:todolistID , entityStatus:'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistID , id: taskId , entityStatus: 'loading'}))
        todolistAPI.deleteTask(todolistID , taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTasksAC({todolistID ,taskID: taskId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({todolistID , id: taskId , entityStatus: 'succeeded'}))
                    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
                } else {
                    handleServerAppError(res.data , dispatch)
                    dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'failed'}))
                    dispatch(changeTaskEntityStatusAC({todolistID , id: taskId , entityStatus: 'failed'}))
                }
            })
            .catch((error) => {
                handleServerNetworkError(error , dispatch)

            })
    }
}

export const changeTaskStatusTC = (todolistID: string , taskId: string , status: TaskStatuses) => {
    return (dispatch: Dispatch , getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistID]
        const task = tasksForCurrentTodolist.find((el) => {
            return el.id === taskId
        })
        if (task) {
            todolistAPI.updateTask(todolistID , taskId , {
                title: task.title ,
                description: task.description ? task.description : '' ,
                status: status ,
                priority: task.priority ,
                startDate: task.startDate ? task.startDate : '' ,
                deadline: task.deadline ? task.deadline : ''
            })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
                        dispatch(changeTaskStatusAC({todolistID ,taskID: taskId , status}))
                    } else {
                        handleServerAppError(res.data , dispatch)
                    }
                })
                .catch((error) => {
                    handleServerNetworkError(error , dispatch)

                })
        }
    }
}

export const changeTaskTitleTC = (todolistID: string , taskId: string , title: string) => {
    return (dispatch: Dispatch , getState: () => AppRootStateType) => {
        const allTasksFromState = getState().tasks
        const tasksForCurrentTodolist = allTasksFromState[todolistID]
        const task = tasksForCurrentTodolist.find((el) => {
            return el.id === taskId
        })
        if (task) {
            todolistAPI.updateTask(todolistID , taskId , {
                title: title ,
                description: task.description ? task.description : '' ,
                status: task.status ,
                priority: task.priority ,
                startDate: task.startDate ? task.startDate : '' ,
                deadline: task.deadline ? task.deadline : ''
            })
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({todolistID ,taskID: taskId , updateTitle:title}))
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
                    } else {
                        handleServerAppError(res.data , dispatch)
                    }

                })
                .catch((error) => {
                    handleServerNetworkError(error , dispatch)
                })
        }
    }
}



