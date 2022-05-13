import {TaskType} from "../ToDoList";
import {addNewTodoListACType , removeTodoListACType} from "./todolistsReducer";
import {v1} from "uuid";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export let todolistID1 = v1();
export let todolistID2 = v1();
const initialState:TasksStateType = {
        // [todolistID1]: [
        //     {id: v1() , title: "HTML&CSS" , isDone: true} ,
        //     {id: v1() , title: "JS" , isDone: true} ,
        //     {id: v1() , title: "ReactJS" , isDone: false} ,
        //     {id: v1() , title: "Rest API" , isDone: false} ,
        //     {id: v1() , title: "GraphQL" , isDone: false} ,
        // ] ,
        // [todolistID2]: [
        //     {id: v1() , title: "Milk" , isDone: true} ,
        //     {id: v1() , title: "Juice" , isDone: true} ,
        //     {id: v1() , title: "blabla" , isDone: false} ,
        //     {id: v1() , title: "smth else" , isDone: false} ,
        //     {id: v1() , title: "bananas" , isDone: false} ,
        // ]
    }

export const tasksReducers = (state:TasksStateType = initialState,action:tasksReducersAC): TasksStateType =>{
    switch (action.type){
        case "REMOVE-TASKS":{
          return  {...state,[action.todolistID]:state[action.todolistID].filter(el=>el.id!==action.taskID)}
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
                    state[action.payload.todolistID].map(el=>el.id===action.payload.taskID?
                        {...el,isDone:action.payload.isDone}:el)}
        }
        case "UPDATE-TASK":{
            return {...state,[action.payload.todolistID]:state[action.payload.todolistID].map(el=>el.id===action.payload.taskID?
                    {...el,title:action.payload.updateTitle}:el)}
        }
        case "ADD-NEW-TODOLIST": {
            return {...state,[action.payload.newID]:[]}
        }
        case "REMOVE-TODOLIST":{
            let copyState = {...state}
            delete copyState[action.payload.todolistID]
            return copyState
        }
        default: return state
    }

}

type tasksReducersAC = removeTasksACType | addTasksACType | changeTaskStatusACType |
    updateTaskACType | removeTodoListACType | addNewTodoListACType |addNewTodolistACType

type removeTasksACType =  ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistID:string,taskID: string)=>{
    return{
        type: "REMOVE-TASKS",
        todolistID:todolistID,
        taskID:taskID
    } as const
}

type addTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todolistID:string,title:string,newID:string)=>{
    return{
        type: "ADD-TASKS",
        payload:{todolistID,title,newID}
    }as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID:string,taskID: string, isDone:boolean)=>{
    return{
        type: "CHANGE-TASK-STATUS",
        payload:{todolistID,taskID,isDone}
    }as const
}

type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID:string,taskID: string, updateTitle:string)=>{
    return{
        type: "UPDATE-TASK",
        payload:{todolistID,taskID,updateTitle}
    }as const
}

 type addNewTodolistACType = ReturnType<typeof updateNewTodolistAC>
 export const updateNewTodolistAC = (newID:string)=>{
    return{
        type:"ADD-NEW-TODOLIST",
        payload: {newID}
    } as const
}

