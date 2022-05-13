import React , {useCallback} from 'react';
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import AddItemForm from "./AddItemForm";

type TodoListHeaderPropsType = {
    title:string
    addTask: (todolistID:string,title:string) =>void
    filter:FilterValuesType
    todolistID:string
    updateTodoListTitle:(todolistID:string,title:string)=>void
    removeTodoList:(todoListID:string)=>void
}
const TodoListHeader = (props:TodoListHeaderPropsType) => {
    const updateTodoListTitleHandler = useCallback( (title:string) => {
        props.updateTodoListTitle(props.todolistID,title)
    },[props.updateTodoListTitle,props.todolistID])

    const removeTodoList = () => {
      props.removeTodoList(props.todolistID)
    }
    const addTaskHandler =useCallback( (title:string) => {
        props.addTask(props.todolistID,title)
    },[props.addTask,props.todolistID])
    return (
        <>
            <h3>
                <EditableSpan oldTitle={props.title} nameOfClass={'title'} callBack={updateTodoListTitleHandler}

                />

                {/*<button onClick={removeTodoList}>remove all todolist</button>*/}
                <IconButton aria-label="delete" onClick={removeTodoList}>
                    <Delete />
                </IconButton>
                <div className='headerFilter'>{props.filter}</div>
            </h3>

            <AddItemForm addItem={addTaskHandler}
            />
        </>

    );
};

export default TodoListHeader;