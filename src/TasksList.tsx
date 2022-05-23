import React , {memo , useCallback} from 'react';
import Task from "./Task";
import {TaskType} from "./ToDoList";
import ControlButtons from "./ControlButtons";
import {FilterValuesType} from "./App";
import {useDispatch} from "react-redux";
import {filterReducerAC} from "./reducers/todolistsReducer";

type TasksListPropsType = {
    tasks: Array<TaskType>
    filter: FilterValuesType
    todolistID:string
    //removeTask: (todolistID:string,taskID:string)=> void
    //changeFilter: (todolistID:string,filter:FilterValuesType)  => void
    //changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    //updateTask:(todolistID:string,taskID:string,updateTitle:string) => void
}

const TasksList = memo((props: TasksListPropsType) => {
    const dispatch = useDispatch()
    const changeFilter = useCallback((todolistID: string , value: FilterValuesType) => {
        dispatch(filterReducerAC(todolistID , value))
    },[dispatch])

    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    } else if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

   const tasksComponentsList = tasksForTodolist.map(task => {
       return(
        <Task
            key={task.id}
            {...task}  //пройтись мапом по всем компонентам с помощью спреад
            todolistID = {props.todolistID}
            // removeTask={removeTask}
            // changeTaskStatus={changeTaskStatus}
            // updateTask = {updateTask}
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