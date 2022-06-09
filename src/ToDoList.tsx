import React , {memo , useCallback , useEffect} from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {useDispatch , useSelector} from "react-redux";
import {FilterValuesType  , removeTodolistTC} from "./reducers/todolistsReducer";
import {TaskType} from "./api/todolist-api";
import {fetchTasksTC} from "./reducers/tasksReducers";
import {AppRootStateType} from "./store/store";
import {RequestStatusType} from "./reducers/appReducer";
import {LinearProgress} from "@mui/material";

type ToDoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    entityStatus:RequestStatusType
}


const ToDoList = memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)

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
                />
                {status==='loading' && <LinearProgress />}
            </div>
        </div>
    )
})

export default ToDoList;