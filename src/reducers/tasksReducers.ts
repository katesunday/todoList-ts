import {TaskType} from "../ToDoList";
import {addNewTodoListACType} from "./todolistsReducer";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const tasksReducers = (state:TasksStateType,action:tasksReducersAC): TasksStateType =>{
    switch (action.title){
        case "REMOVE-TASKS":{
          return  {...state,[action.payload.todolistID]:state[action.payload.todolistID].filter(el=>el.id!==action.payload.taskID)}
        }
        case "ADD-TASKS":{
            let task = {id: action.payload.newID, title: action.payload.title, isDone:false}
            return {
                ...state,
                [action.payload.todolistID]: [task,...state[action.payload.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS":{
            return {...state,[action.payload.todolistID]:
                    state[action.payload.todolistID].map(el=>el.id===action.payload.taskID?{...el,isDone:action.payload.isDone}:el)}
        }
        case "UPDATE-TASK":{
            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].map(el=>el.id===action.payload.taskID?{...el,title:action.payload.updateTitle}:el)}
        }
        case "ADD-NEW-TODOLIST": {
            return {...state,[action.payload.newID]:[]}
        }
        case "UPDATE-REMOVED-TODOLIST":{
            return {...state}
        }
        default: return state
    }

}

type tasksReducersAC = removeTasksACType | addTasksACType | changeTaskStatusACType |
    updateTaskACType | updateRemovedTodoListACType | addNewTodoListACType |addNewTodolistACType

type removeTasksACType =  ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistID:string,taskID: string)=>{
    return{
        title: "REMOVE-TASKS",
        payload:{todolistID,taskID}
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todolistID:string,title:string,newID:string)=>{
    return{
        title: "ADD-TASKS",
        payload:{todolistID,title,newID}
    }as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID:string,taskID: string, isDone:boolean)=>{
    return{
        title: "CHANGE-TASK-STATUS",
        payload:{todolistID,taskID,isDone}
    }as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID:string,taskID: string, updateTitle:string)=>{
    return{
        title: "UPDATE-TASK",
        payload:{todolistID,taskID,updateTitle}
    }as const
}

 type addNewTodolistACType = ReturnType<typeof updateNewTodolistkAC>
 export const updateNewTodolistkAC = (newID:string)=>{
    return{
       title:"ADD-NEW-TODOLIST",
        payload: {newID}
    } as const
}

type updateRemovedTodoListACType = ReturnType<typeof updateRemovedTodoListAC>
export const updateRemovedTodoListAC = ()=>{
    return{
        title:"UPDATE-REMOVED-TODOLIST"
    }as const
}