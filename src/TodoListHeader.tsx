import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";

type TodoListHeaderPropsType = {
    title:string
    addTask: (todolistID:string,title:string) =>void
    filter:FilterValuesType
    todolistID:string
    updateTodoListTitle:(todolistID:string,title:string)=>void
    removeTodoList:(todoListID:string)=>void
}
const TodoListHeader = (props:TodoListHeaderPropsType) => {
    const updateTodoListTitleHandler = (title:string) => {
        props.updateTodoListTitle(props.todolistID,title)
    }
    const removeTodoList = () => {
      props.removeTodoList(props.todolistID)
    }
    const addTaskHandler = (title:string) => {
        props.addTask(props.todolistID,title)
    }
    return (
        <>
            <h3>
                <EditableSpan oldTitle={props.title} nameOfClass={'title'} callBack={updateTodoListTitleHandler}/>
                <div className='headerFilter'>{props.filter}</div>
                <button onClick={removeTodoList}>remove all todolist</button>
            </h3>

            <AddTaskForm
                addTask = {addTaskHandler}
            />
        </>

    );
};

export default TodoListHeader;