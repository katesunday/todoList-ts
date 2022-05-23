import React , {memo , useCallback} from 'react';
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {updateTodoListTitleAC} from "./reducers/todolistsReducer";
import {useDispatch} from "react-redux";
import {v1} from "uuid";
import {addTasksAC} from "./reducers/tasksReducers";

type TodoListHeaderPropsType = {
    title: string
    filter: FilterValuesType
    todolistID: string
    removeTodoList: (todoListID: string) => void
    //addTask: (todolistID:string,title:string) =>void
    // updateTodoListTitle:(todolistID:string,title:string)=>void
}
const TodoListHeader = memo((props: TodoListHeaderPropsType) => {
    const dispatch = useDispatch()
    const updateTodoListTitleHandler = useCallback((title: string) => {
        dispatch(updateTodoListTitleAC(props.todolistID , title))
        //props.updateTodoListTitle(props.todolistID,title)
    } , [props.todolistID , dispatch])

    const removeTodoList = () => {
        props.removeTodoList(props.todolistID)
    }
    const addTaskHandler = useCallback((title: string) => {
        let newID = v1()
        dispatch(addTasksAC(props.todolistID , title , newID))
        //props.addTask(props.todolistID,title)
    } , [props.todolistID , dispatch])

    return (
        <>
            <h3>
                <EditableSpan oldTitle={props.title}
                              nameOfClass={'title'}
                              callBack={updateTodoListTitleHandler}
                />

                {/*<button onClick={removeTodoList}>remove all todolist</button>*/}
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
                <div className='headerFilter'>{props.filter}</div>
            </h3>

            <AddItemForm addItem={addTaskHandler}
            />
        </>

    );
});

export default TodoListHeader;