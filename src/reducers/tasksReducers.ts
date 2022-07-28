import {
    addNewTodoListAC ,
    changeTodolistEntityStatusAC , clearTodolistsDataAC , removeTodoListAC , setTodolistsAC
} from "./todolistsReducer";
import {TaskStatuses , TaskType , todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store/store";
import {RequestStatusType , setAppStatusAC} from "./appReducer";
import {handleServerAppError , handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk , createSlice , PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";


export type TaskDomainType = TaskType & {
    taskEntityStatus: RequestStatusType
}
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>,
}

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks' , async (todolistID: string , thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
    const res = await todolistAPI.getTasks(todolistID)
    try {
        if (!res.data.error) {
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'succeeded'}))
            return {tasks , todolistID}
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , thunkAPI.dispatch)

    }

})

export const removeTaskTC = createAsyncThunk('tasks/removeTask' , async (param: { todolistID: string, taskId: string } , thunkAPI) => {
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'loading'}))
    thunkAPI.dispatch(changeTaskEntityStatusAC({
        todolistID: param.todolistID ,
        id: param.taskId ,
        entityStatus: 'loading'
    }))
    const res = await todolistAPI.deleteTask(param.todolistID , param.taskId)
    try {
        if (res.data.resultCode === 0) {
            //thunkAPI.dispatch(removeTasksAC({todolistID:param.todolistID , taskID: param.taskId}))
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            thunkAPI.dispatch(changeTaskEntityStatusAC({
                todolistID: param.todolistID ,
                id: param.taskId ,
                entityStatus: 'succeeded'
            }))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'succeeded'}))
            return {todolistID: param.todolistID , taskID: param.taskId}
        } else {
            handleServerAppError(res.data , thunkAPI.dispatch)
            thunkAPI.dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'failed'}))
            thunkAPI.dispatch(changeTaskEntityStatusAC({
                todolistID: param.todolistID ,
                id: param.taskId ,
                entityStatus: 'failed'
            }))
            return thunkAPI.rejectWithValue({errors: res.data.messages , fieldsErrors: res.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message] , fieldsErrors: undefined})

    }

})

export const addTaskTC = createAsyncThunk('tasks/addTask' , async (param: { todolistID: string, title: string } , {dispatch,rejectWithValue}) => {
    dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'loading'}))
    const res = await todolistAPI.createTask(param.todolistID , param.title)
    try {
        if (res.data.resultCode === 0) {
            const task = res.data.data.item
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'succeeded'}))
            return {task}
        } else {
            handleServerAppError(res.data , dispatch)
            dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'failed'}))
            return rejectWithValue({errors: res.data.messages , fieldsErrors: res.data.fieldsErrors})
        }
    } catch (e) {
        const error = e as Error | AxiosError<{ error: string }>
        handleServerNetworkError(error , dispatch)
        dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'failed'}))
        return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})
    }
})

export const changeTaskStatusTC = createAsyncThunk('tasks/changeTaskStatus',
    async (param:{todolistID: string , taskId: string , status: TaskStatuses},{dispatch,getState,rejectWithValue}) => {
        const state = getState() as AppRootStateType
        const allTasksFromState = state.tasks
        const tasksForCurrentTodolist = allTasksFromState[param.todolistID]
        const task = tasksForCurrentTodolist.find((el) => {
            return el.id === param.taskId
        })
        if (task) {
           const res = await todolistAPI.updateTask(param.todolistID , param.taskId , {
                title: task.title ,
                description: task.description ? task.description : '' ,
                status: param.status ,
                priority: task.priority ,
                startDate: task.startDate ? task.startDate : '' ,
                deadline: task.deadline ? task.deadline : ''
            })
                try{
                    if (res.data.resultCode === 0) {
                        dispatch(setAppStatusAC({status: 'succeeded'}))
                        dispatch(changeTodolistEntityStatusAC({id: param.todolistID , entityStatus: 'succeeded'}))
                        //dispatch(changeTaskStatusAC({todolistID:param.todolistID , taskID: param.taskId , status: param.status}))
                        return {todolistID:param.todolistID , taskID: param.taskId , status: param.status}
                    } else {
                        handleServerAppError(res.data , dispatch)
                        return rejectWithValue({errors: res.data.messages , fieldsErrors: res.data.fieldsErrors})
                    }
                }
                catch(e) {
                    const error = e as Error | AxiosError<{ error: string }>
                    handleServerNetworkError(error , dispatch)
                    return rejectWithValue({errors: [error.message] , fieldsErrors: undefined})
                }
        }
    }
)

const slice = createSlice({
    name: 'tasks' ,
    initialState: initialState ,
    reducers: {
        // changeTaskStatusAC(state , action: PayloadAction<{ todolistID: string, taskID: string, status: TaskStatuses }>) {
        //     const tasks = state[action.payload.todolistID]
        //     const index = tasks.findIndex(el => el.id === action.payload.taskID)
        //     tasks[index] = {...tasks[index] , status: action.payload.status}
        //
        //     // state[action.payload.todolistID] =
        //     //     state[action.payload.todolistID].map(el => el.id === action.payload.taskID ?
        //     //         {...el , status: action.payload.status} : el)
        // } ,
        updateTaskAC(state , action: PayloadAction<{ todolistID: string, taskID: string, updateTitle: string }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            tasks[index] = {...tasks[index] , title: action.payload.updateTitle}
            // state[action.payload.todolistID] = state[action.payload.todolistID].map((el) => el.id === action.payload.taskID ?
            //     {...el , title: action.payload.updateTitle} : el)
        } ,
        changeTaskEntityStatusAC(state , action: PayloadAction<{ todolistID: string, id: string, entityStatus: RequestStatusType }>) {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.id)
            tasks[index] = {...tasks[index] , taskEntityStatus: action.payload.entityStatus}

            // state[action.payload.todolistID] = state[action.payload.todolistID].map((el) =>
            //     el.id === action.payload.id ? {...el , taskEntityStatus: action.payload.entityStatus} : el)
        } ,
    } ,
    extraReducers: (builder) => {
        builder.addCase(setTodolistsAC , (state , action) => {
            action.payload.todolists.forEach((el) => {
                state[el.id] = []
            })
        });
        builder.addCase(addNewTodoListAC , (state , action) => {
            state[action.payload.newID] = []
        })
        builder.addCase(removeTodoListAC , (state , action) => {
            delete state[action.payload.todolistID]
        })
        builder.addCase(clearTodolistsDataAC , state => {
            return state = {}
        })
        builder.addCase(fetchTasksTC.fulfilled , (state , action) => {
            if (action.payload) {
                state[action.payload.todolistID] = action.payload.tasks.map((task) => (
                    {...task , taskEntityStatus: 'idle'}))
            }

        })
        builder.addCase(removeTaskTC.fulfilled , (state , action) => {
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload.taskID)
            if (index > -1) {
                tasks.splice(index , 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled,(state,action)=>{
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift({...action.payload.task , taskEntityStatus: 'idle'})
        })
        builder.addCase(changeTaskStatusTC.fulfilled,(state,action)=>{
            if(action.payload){
            const tasks = state[action.payload.todolistID]
            const index = tasks.findIndex(el => el.id === action.payload?.taskID)
            tasks[index] = {...tasks[index] , status: action.payload.status}
            }
        })
    }
})

export const tasksReducers = slice.reducer
export const {
    changeTaskEntityStatusAC ,
    //removeTasksAC ,
    // addTasksAC ,
    // changeTaskStatusAC ,
    updateTaskAC ,
    // setTasksAC
} = slice.actions


export const addTaskTC_ = (todolistID: string , title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
        todolistAPI.createTask(todolistID , title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                   // task && dispatch(addTasksAC({task}))
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

export const removeTaskTC_ = (todolistID: string , taskId: string) => {
    return (dispatch: Dispatch) => {
        //dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC({id: todolistID , entityStatus: 'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistID , id: taskId , entityStatus: 'loading'}))
        todolistAPI.deleteTask(todolistID , taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    //dispatch(removeTasksAC({todolistID , taskID: taskId}))
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

export const changeTaskStatusTC_ = (todolistID: string , taskId: string , status: TaskStatuses) => {
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
                       // dispatch(changeTaskStatusAC({todolistID , taskID: taskId , status}))
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
                        dispatch(updateTaskAC({todolistID , taskID: taskId , updateTitle: title}))
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



