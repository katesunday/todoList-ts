import React , {memo , useCallback} from 'react';
import Task from "./Task";
import ControlButtons from "./ControlButtons";
import {useDispatch } from "react-redux";
import {changeTodolistFilterAC , FilterValuesType} from "./reducers/todolistsReducer";
import {TaskStatuses } from "./api/todolist-api";
import {TaskDomainType} from "./reducers/tasksReducers";


type TasksListPropsType = {
    tasks: TaskDomainType[]
    filter: FilterValuesType
    todolistID:string
}

const TasksList = memo((props: TasksListPropsType) => {

    const dispatch = useDispatch()

    const changeFilter = useCallback((todolistID: string , value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({todolistID , value}))
    },[dispatch])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    } else if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

   const tasksComponentsList = tasksForTodolist.map(task => {
       return(
               <Task
                   key={task.id}
                   {...task}  //пройтись мапом по всем компонентам с помощью спреад
                   todolistID = {props.todolistID}

               />

       )
   })
    const emptyMessage = <span style={{fontSize:'14px'}}>Task list is empty. Change filter or add task.</span>
    const tasksList =  tasksComponentsList.length
            ?
            <ul>
                {tasksComponentsList}
            </ul>
            : emptyMessage
    return (
        <>
            {tasksList}
            <ControlButtons
                changeFilter={changeFilter}
                filter={props.filter}
                todolistID ={props.todolistID}
            />
        </>

);
});

export default TasksList;