import React , {memo , useCallback , useEffect} from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {useDispatch} from "react-redux";
import {FilterValuesType  , removeTodolistTC} from "./reducers/todolistsReducer";
import {TaskType} from "./api/todolist-api";
import {fetchTasksTC} from "./reducers/tasksReducers";

type ToDoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
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
                />
                <TasksList
                    tasks={props.tasks}
                    filter={props.filter}
                    todolistID={props.todolistID}
                />
            </div>
        </div>
    )
})

export default ToDoList;