import React from 'react';
import TodoListHeader from "./TodoListHeader";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import AddTaskForm from "./AddTaskForm";
import {v1} from "uuid";

type ToDoListPropsType = {
    todolistID:string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID:string,taskID:string)=> void
    changeFilter: (todolistID:string,filter:FilterValuesType)  => void
    addTask: (todolistID:string,title:string) =>void
    changeTaskStatus:(todolistID:string,taskID: string, isDone:boolean) => void
    removeTodoList:(todoListID:string)=>void
    updateTask:(todolistID:string,taskID:string,updateTitle:string) => void
    updateTodoListTitle:(todolistID:string,title:string)=>void
}
export type TaskType ={
    id: string
    title: string
    isDone: boolean

}

const ToDoList = (props: ToDoListPropsType) => {
  return(
      <div className="App">

          <div>
              <TodoListHeader title={props.title}
                              addTask = {props.addTask}
                              filter={props.filter}
                              todolistID = {props.todolistID}
                              updateTodoListTitle = {props.updateTodoListTitle}
                              removeTodoList = {props.removeTodoList}
              />
              <TasksList
                  tasks={props.tasks}
                  removeTask={props.removeTask}
                  changeFilter = {props.changeFilter}
                  filter={props.filter}
                  changeTaskStatus={props.changeTaskStatus}
                  todolistID = {props.todolistID}
                  updateTask = {props.updateTask}

              />
          </div>
      </div>
  )
}

export  default ToDoList;