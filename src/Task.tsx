import React , {ChangeEvent} from 'react';
import {TaskType} from "./ToDoList";
import EditableSpan from "./EditableSpan";

type TaskPropType = TaskType & {
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
    const updateTaskHandler = (title:string) => {
        props.updateTask(props.todolistID,props.id,title)
    }
    return (
            <li >
                <input type="checkbox"
                       onChange={changeTaskStatus}
                       checked={props.isDone}
                />
                {/*<span className={completedClass}>{props.title}</span>*/}
                <EditableSpan oldTitle = {props.title} nameOfClass = {completedClass} callBack = {(title)=>updateTaskHandler(title)}/>
                <button onClick={removeTask}>x</button>
            </li>

    );
};

export default Task;