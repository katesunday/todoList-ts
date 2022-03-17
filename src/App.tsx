import React , {useReducer , useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";
import AddTaskForm from "./AddTaskForm";
import {
    todolistsReducer ,
    filterReducerAC ,
    updateTodoListTitleAC ,
    removeTodoListAC ,
    addNewTodoListAC
} from "./reducers/todolistsReducer";
import {
    addTasksAC ,
    changeTaskStatusAC ,
    removeTasksAC ,
    tasksReducers ,
    updateTaskAC ,
    updateRemovedTodoListAC , updateNewTodolistkAC
} from "./reducers/tasksReducers";
import ButtonAppBar from "./components/ButtonAppBar";
import {Container , Grid , Paper} from "@material-ui/core";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists , todolistsDispatch] = useReducer(todolistsReducer , [
        {id: todolistID1 , title: 'What to learn' , filter: 'all'} ,
        {id: todolistID2 , title: 'What to buy' , filter: 'all'} ,
    ])

    let [tasks , tasksDispatch] = useReducer(tasksReducers , {
        [todolistID1]: [
            {id: v1() , title: "HTML&CSS" , isDone: true} ,
            {id: v1() , title: "JS" , isDone: true} ,
            {id: v1() , title: "ReactJS" , isDone: false} ,
            {id: v1() , title: "Rest API" , isDone: false} ,
            {id: v1() , title: "GraphQL" , isDone: false} ,
        ] ,
        [todolistID2]: [
            {id: v1() , title: "HTML&CSS2" , isDone: true} ,
            {id: v1() , title: "JS2" , isDone: true} ,
            {id: v1() , title: "ReactJS2" , isDone: false} ,
            {id: v1() , title: "Rest API2" , isDone: false} ,
            {id: v1() , title: "GraphQL2" , isDone: false} ,
        ]
    });

    // const [filter , setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (todolistID: string , value: FilterValuesType) => {
        todolistsDispatch(filterReducerAC(todolistID , value))
        // setTodolists(todolists.map((el)=> el.id ===todolistID ? {...el,filter:value} : el))
        // берем объект идем мапом и если в нем у элемента айдишка равна айдишке
        // из аргумента, то копируем остальной кусок объекта и даем туда новое
        // значение фильта - вэлью(второй аргумент)
    }

    const removeTask = (todolistID: string , taskID: string) => {
        tasksDispatch(removeTasksAC(todolistID , taskID))
        //setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)})

    }

    const addTask = (todolistID: string , title: string) => {
        let newID = v1()
        tasksDispatch(addTasksAC(todolistID , title , newID))
        // setTasks({...tasks,[todolistID]:[{id: v1(),title: title,isDone: false},...tasks[todolistID]]})

    }
    const changeTaskStatus = (todolistID: string , taskID: string , isDone: boolean) => {
        tasksDispatch(changeTaskStatusAC(todolistID , taskID , isDone))
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID?{...el,isDone:isDone}:el)})
    }

    const removeTodoList = (todolistID: string) => {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        todolistsDispatch(removeTodoListAC(todolistID))
        // setTodolists(todolists.filter(el => el.id !== todolistID));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[todolistID]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        tasksDispatch(updateRemovedTodoListAC())
        //setTasks({...tasks});
    }
    const updateTask = (todolistID: string , taskID: string , updateTitle: string) => {
        tasksDispatch(updateTaskAC(todolistID , taskID , updateTitle))
        // console.log(updateTitle)
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID?{...el,title:updateTitle}:el)})
    }
    const updateTodoListTitle = (todolistID: string , title: string) => {
        todolistsDispatch(updateTodoListTitleAC(todolistID , title))
        // setTodolists(todolists.map((el)=>el.id===todolistID?{...el,title:title}:el))
    }
    const addNewTask = (title: string) => {
        let newID = v1()
        todolistsDispatch(addNewTodoListAC(title,newID))
        tasksDispatch(updateNewTodolistkAC(newID))
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
