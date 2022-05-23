import React , {memo , useCallback} from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import {useDispatch} from "react-redux";
import {removeTodoListAC} from "./reducers/todolistsReducer";

type ToDoListPropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    //removeTask: (todolistID:string,taskID:string)=> void
    //changeFilter: (todolistID:string,filter:FilterValuesType)  => void
    //addTask: (todolistID:string,title:string) =>void
    //changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    //removeTodoList:(todoListID:string)=>void
    // updateTask:(todolistID:string,taskID:string,updateTitle:string) => void
    //updateTodoListTitle:(todolistID:string,title:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const ToDoList = memo((props: ToDoListPropsType) => {
    const dispatch = useDispatch()
    const removeTodoList = useCallback((todolistID: string) => {
        dispatch(removeTodoListAC(todolistID))
        // @ts-ignore
        delete props.tasks[todolistID];
        dispatch(removeTodoListAC(todolistID))
    } , [dispatch , props.tasks])



    return (
        <div className="App">

            <div>
                <TodoListHeader title={props.title}
                                filter={props.filter}
                                todolistID={props.todolistID}
                                removeTodoList={removeTodoList}
                                //updateTodoListTitle = {props.updateTodoListTitle}
                                //addTask = {props.addTask}
                />
                <TasksList
                    tasks={props.tasks}
                    filter={props.filter}
                    todolistID={props.todolistID}
                    //removeTask={props.removeTask}
                    // changeFilter = {props.changeFilter}
                    //changeTaskStatus={props.changeTaskStatus}
                    //updateTask = {props.updateTask}

                />
            </div>
        </div>
    )
})

export default ToDoList;