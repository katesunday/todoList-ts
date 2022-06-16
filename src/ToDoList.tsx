import React , {memo , useCallback , useEffect} from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {useDispatch } from "react-redux";
import {FilterValuesType  , removeTodolistTC} from "./reducers/todolistsReducer";
import {fetchTasksTC , TaskDomainType} from "./reducers/tasksReducers";
import {RequestStatusType} from "./reducers/appReducer";
import {LinearProgress} from "@mui/material";

type ToDoListPropsType = {
    todolistID: string
    title: string
    tasks: TaskDomainType[]
    filter: FilterValuesType
    entityStatus:RequestStatusType
}


const ToDoList = memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()

    useEffect(()=>{

        dispatch(fetchTasksTC(props.todolistID))
    },[])

    const removeTodoList = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    } , [dispatch ])



    return (
        <div className="App">

            <div>
                <TodoListHeader title={props.title}
                                filter={props.filter}
                                todolistID={props.todolistID}
                                removeTodoList={removeTodoList}
                                entityStatus = {props.entityStatus}
                />
                <TasksList
                    tasks={props.tasks}
                    filter={props.filter}
                    todolistID={props.todolistID}
                    //entityStatus = {props.entityStatus}
                />
                {props.entityStatus==='loading' && <LinearProgress />}
            </div>
        </div>
    )
})

export default ToDoList;