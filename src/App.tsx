import React , {useCallback} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import {
    filterReducerAC ,
    updateTodoListTitleAC ,
    removeTodoListAC ,
    addNewTodoListAC
} from "./reducers/todolistsReducer";
import {
    addTasksAC ,
    changeTaskStatusAC ,
    removeTasksAC ,
    updateTaskAC ,TasksStateType
} from "./reducers/tasksReducers";
import ButtonAppBar from "./components/ButtonAppBar";
import {useDispatch , useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import AddItemForm from "./AddItemForm";
import {Container , Grid , Paper} from "@mui/material";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType,Array<TodolistsType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)


    const changeFilter = useCallback((todolistID: string , value: FilterValuesType) => {
        dispatch(filterReducerAC(todolistID , value))
    },[dispatch])

    const removeTask = useCallback((todolistID: string , taskID: string) => {
        dispatch(removeTasksAC(todolistID , taskID))

    },[dispatch])

    const addTask = useCallback((todolistID: string , title: string) => {
        let newID = v1()
        dispatch(addTasksAC(todolistID , title , newID))

    },[dispatch])

    const changeTaskStatus = useCallback((todolistID: string , taskID: string , isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID , taskID , isDone))
    },[dispatch])

    const removeTodoList = useCallback((todolistID: string) => {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        dispatch(removeTodoListAC(todolistID))
        // setTodolists(todolists.filter(el => el.id !== todolistID));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistID]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        dispatch(removeTodoListAC(todolistID))
        //setTasks({...tasks});
    },[dispatch,tasks])

    const updateTask = useCallback((todolistID: string , taskID: string , updateTitle: string) => {
        dispatch(updateTaskAC(todolistID , taskID , updateTitle))
    },[dispatch])

    const updateTodoListTitle = useCallback((todolistID: string , title: string) => {
        dispatch(updateTodoListTitleAC(todolistID , title))
    },[dispatch])

    const addTodoList = useCallback( (title: string) => {
        let newID = v1()
        dispatch(addNewTodoListAC(title,newID))

    },[dispatch])

    return (
        <div>
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((el) => {
                        let tasksForTodolist = tasks[el.id];
                        return (
                            <Grid key={el.id} item>
                                <Paper key={el.id} elevation={6} style={{padding: '10px'}}>
                                    <ToDoList
                                        key={el.id}
                                        todolistID={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        filter={el.filter}
                                        changeTaskStatus={changeTaskStatus}
                                        updateTask={updateTask}
                                        updateTodoListTitle={updateTodoListTitle}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
