import React , {ChangeEvent , memo , useCallback} from 'react';
import {TaskType} from "./ToDoList";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC , removeTasksAC , updateTaskAC} from "./reducers/tasksReducers";
import {useDispatch} from "react-redux";

export type TaskPropType = TaskType & {
    todolistID:string
    //removeTask: (todolistID:string,taskID:string)=> void
    //changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    //updateTask : (todolistID:string,taskID:string,updateTitle:string) => void
}

const Task = memo((props: TaskPropType) => {
    const dispatch = useDispatch()
    const completedClass = `task ${props.isDone ? 'completedTask' :''}`;

    const removeTask = useCallback(() => {
        dispatch(removeTasksAC(props.todolistID , props.id))
    },[dispatch,props.todolistID,props.id])

    const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.todolistID,props.id, e.currentTarget.checked))
       // props.changeTaskStatus(props.todolistID,props.id,e.currentTarget.checked)
    }
    const updateTaskHandler = useCallback((title:string) => {
        dispatch(updateTaskAC(props.todolistID,props.id,title))
       //props.updateTask(props.todolistID,props.id,title)
    },[props,dispatch])
    return (
            <li >
                <input type="checkbox"
                       onChange={changeTaskStatus}
                       checked={props.isDone}
                />
                <EditableSpan oldTitle = {props.title} nameOfClass = {completedClass}
                              callBack = {useCallback((title)=>updateTaskHandler(title),[updateTaskHandler])}/>
                <IconButton aria-label="delete" onClick={removeTask}>
                    <Delete />
                </IconButton>
            </li>

    );
});

export default Task;