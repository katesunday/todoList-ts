import React , {ChangeEvent , useCallback} from 'react';
import {TaskType} from "./ToDoList";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskPropType = TaskType & {
    removeTask: (todolistID:string,taskID:string)=> void
    changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    todolistID:string
    updateTask : (todolistID:string,taskID:string,updateTitle:string) => void
}

const Task = (props: TaskPropType) => {
    const completedClass = `task ${props.isDone ? 'completedTask' :''}`;
    const removeTask = () => {
        props.removeTask(props.todolistID,props.id)
    }
    const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID,props.id,e.currentTarget.checked)
    }
    const updateTaskHandler = useCallback((title:string) => {
        props.updateTask(props.todolistID,props.id,title)
    },[props])
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
};

export default Task;