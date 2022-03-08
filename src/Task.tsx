import React , {ChangeEvent} from 'react';
import {TaskType} from "./ToDoList";

type TaskPropType = TaskType & {
    removeTask: (todolistID:string,taskID:string)=> void
    changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    todolistID:string
}

const Task = (props: TaskPropType) => {
    const completedClass = `task ${props.isDone ? 'completedTask' :''}`;
    const removeTask = () => {
        props.removeTask(props.todolistID,props.id)
    }
    const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistID,props.id,e.currentTarget.checked)
    }
    return (
            <li >
                <input type="checkbox"
                       onChange={changeTaskStatus}
                       checked={props.isDone}
                />
                <span className={completedClass}>{props.title}</span>
                <button onClick={removeTask}>x</button>
            </li>

    );
};

export default Task;