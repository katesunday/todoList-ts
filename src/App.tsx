import React  from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddTaskForm from "./AddTaskForm";
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
import {Container , Grid , Paper} from "@material-ui/core";
import {useDispatch , useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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


    const changeFilter = (todolistID: string , value: FilterValuesType) => {
        dispatch(filterReducerAC(todolistID , value))
        // setTodolists(todolists.map((el)=> el.id ===todolistID ? {...el,filter:value} : el))
        // берем объект идем мапом и если в нем у элемента айдишка равна айдишке
        // из аргумента, то копируем остальной кусок объекта и даем туда новое
        // значение фильта - вэлью(второй аргумент)
    }

    const removeTask = (todolistID: string , taskID: string) => {
        dispatch(removeTasksAC(todolistID , taskID))
        //setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)})

    }

    const addTask = (todolistID: string , title: string) => {
        let newID = v1()
        dispatch(addTasksAC(todolistID , title , newID))
        // setTasks({...tasks,[todolistID]:[{id: v1(),title: title,isDone: false},...tasks[todolistID]]})

    }
    const changeTaskStatus = (todolistID: string , taskID: string , isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID , taskID , isDone))
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID?{...el,isDone:isDone}:el)})
    }

    const removeTodoList = (todolistID: string) => {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        dispatch(removeTodoListAC(todolistID))
        // setTodolists(todolists.filter(el => el.id !== todolistID));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistID]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        dispatch(removeTodoListAC(todolistID))
        //setTasks({...tasks});
    }
    const updateTask = (todolistID: string , taskID: string , updateTitle: string) => {
        dispatch(updateTaskAC(todolistID , taskID , updateTitle))
        // console.log(updateTitle)
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID?{...el,title:updateTitle}:el)})
    }
    const updateTodoListTitle = (todolistID: string , title: string) => {
        dispatch(updateTodoListTitleAC(todolistID , title))
        // setTodolists(todolists.map((el)=>el.id===todolistID?{...el,title:title}:el))
    }
    const addNewTask = (title: string) => {
        let newID = v1()
        dispatch(addNewTodoListAC(title,newID))
        // tasksDispatch(updateNewTodolistAC(newID))
        // setTodolists([{id: newID, title: title, filter: "all"},...todolists])
        //setTasks({...tasks,[newID]:[]})

    }

    return (
        <div >
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style = {{padding: '20px'}}>
            <AddTaskForm addTask={addNewTask}/>
                </Grid>
                <Grid container spacing={3}>
            {todolists.map((el) => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (<Grid item>
                    <Paper elevation = {6} style={{padding: '10px'}}>
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

            {/*<ToDoList title={"What to remember"} tasks={task_2} />*/}
            {/*<ToDoList title={"What to ask"} tasks={task_3} />*/}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
