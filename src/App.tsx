import React , {useCallback , useEffect} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import { addTodolistTC , fetchTodolistsTC , TodolistDomainType} from "./reducers/todolistsReducer";
import {TasksStateType} from "./reducers/tasksReducers";
import ButtonAppBar from "./components/ButtonAppBar";
import {useDispatch , useSelector} from "react-redux";
import {AppRootStateType , useAppSelector} from "./store/store";
import AddItemForm from "./AddItemForm";
import {Container , Grid , LinearProgress , Paper} from "@mui/material";
import {  RequestStatusType} from "./reducers/appReducer";
import {ErrorSnackbar} from "./components/ErrorSnackBar/ErrorSnackbar";


function App() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType , Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType , TasksStateType>(state => state.tasks)
    const status = useAppSelector((state) => state.app.status)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    } , [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    } , [dispatch])

    return (
        <div>
            <ErrorSnackbar/>
            <ButtonAppBar/>

            {status==='loading' && <LinearProgress />}
            <Container fixed>

                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList} />
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
                                        entityStatus = {el.entityStatus}
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
