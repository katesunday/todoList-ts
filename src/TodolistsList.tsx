import React , {useCallback , useEffect} from 'react';
import {Grid , LinearProgress , Paper} from "@mui/material";
import AddItemForm from "./AddItemForm";
import ToDoList from "./ToDoList";
import {useDispatch , useSelector} from "react-redux";
import {AppRootStateType , useAppSelector} from "./store/store";
import {addTodolistTC , fetchTodolistsTC , TodolistDomainType} from "./reducers/todolistsReducer";
import {TasksStateType} from "./reducers/tasksReducers";
import {Navigate} from "react-router-dom";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackbar";



export const TodolistsList = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType , Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType , TasksStateType>(state => state.tasks)
    const status = useAppSelector((state) => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        dispatch(fetchTodolistsTC())
    } , [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    } , [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }
    return (
        <div>
            <ErrorSnackbar/>


            {status === 'loading' && <LinearProgress/>}
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodoList} disabled={status}/>
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
                                    filter={el.filter}
                                    entityStatus={el.entityStatus}

                                />
                            </Paper>
                        </Grid>
                    )
                })}

            </Grid>
        </div>
    );
};

export default TodolistsList;