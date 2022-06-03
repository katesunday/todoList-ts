import React , {ChangeEvent , memo , useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusTC , changeTaskTitleTC , removeTaskTC ,} from "./reducers/tasksReducers";
import {useDispatch} from "react-redux";
import {TaskStatuses , TaskType} from "./api/todolist-api";

export type TaskPropType = TaskType & {
    todolistID: string
}

const Task = memo((props: TaskPropType) => {
    const dispatch = useDispatch()
    const completedClass = `task ${props.status === TaskStatuses.Completed ? 'completedTask' : ''}`;

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todolistID , props.id))
    } , [dispatch , props.todolistID , props.id])

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeTaskStatusTC(props.todolistID , props.id ,
            newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
    }
    const updateTaskTitleHandler = useCallback((title: string) => {
        dispatch(changeTaskTitleTC(props.todolistID , props.id , title))
    } , [props , dispatch])
    return (
        <li>
            <input type="checkbox"
                   onChange={changeTaskStatus}
                   checked={props.status === TaskStatuses.Completed}
            />
            <EditableSpan oldTitle={props.title} nameOfClass={completedClass}
                          callBack={useCallback((title) => updateTaskTitleHandler(title) ,
                              [updateTaskTitleHandler])}/>
            <IconButton aria-label="delete" onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>

    );
});

export default Task;