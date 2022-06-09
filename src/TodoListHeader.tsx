import React , {memo , useCallback} from 'react';
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleTC , FilterValuesType } from "./reducers/todolistsReducer";
import {useDispatch} from "react-redux";
import { addTaskTC} from "./reducers/tasksReducers";
import {RequestStatusType} from "./reducers/appReducer";

type TodoListHeaderPropsType = {
    title: string
    filter: FilterValuesType
    todolistID: string
    removeTodoList: (todoListID: string) => void
    entityStatus: RequestStatusType
}
const TodoListHeader = memo((props: TodoListHeaderPropsType) => {
    const dispatch = useDispatch()

    const updateTodoListTitleHandler = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(props.todolistID , title))
    } , [props.todolistID , dispatch])

    const removeTodoList = () => {
        props.removeTodoList(props.todolistID)
    }
    const addTaskHandler = useCallback((title: string) => {
       dispatch(addTaskTC(props.todolistID,title))
    } , [props.todolistID , dispatch])

    return (
        <>
            <h3>
                <EditableSpan oldTitle={props.title}
                              nameOfClass={'title'}
                              callBack={updateTodoListTitleHandler}
                />

                <IconButton aria-label="delete" onClick={removeTodoList}
                            disabled={props.entityStatus ==='loading'}>
                    <Delete/>
                </IconButton>
                <div className='headerFilter'>{props.filter}</div>
            </h3>

            <AddItemForm addItem={addTaskHandler} disabled = {props.entityStatus}
            />
        </>

    );
});

export default TodoListHeader;