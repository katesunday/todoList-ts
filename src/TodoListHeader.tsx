import React from 'react';
import AddTaskForm from "./AddTaskForm";
import {FilterValuesType} from "./App";

type TodoListHeaderPropsType = {
    title:string
    addTask: (todolistID:string,title:string) =>void
    filter:FilterValuesType
    todolistID:string
}
const TodoListHeader = (props:TodoListHeaderPropsType) => {
    return (
        <>
            <h3 className='title'>{props.title}
                <div className='headerFilter'>{props.filter}</div>
            </h3>

            <AddTaskForm
                addTask = {props.addTask}
                todolistID = {props.todolistID}
            />
        </>

    );
};

export default TodoListHeader;