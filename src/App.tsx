import React , {useState} from 'react';
import './App.css';
import ToDoList , {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';
type todolistsType = {
    id:string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists,setTodolists]=useState<Array<todolistsType>>([
        {id:todolistID1,title:'What to learn',filter:'all'},
        {id:todolistID2,title:'What to buy',filter:'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // const [filter , setFilter] = useState<FilterValuesType>('all')

    const changeFilter = (todolistID:string,value:FilterValuesType) => {
        setTodolists(todolists.map((el)=> el.id ===todolistID ? {...el,filter:value} : el))
        // берем объект идем мапом и если в нем у элемента айдишка равна айдишке
        // из аргумента, то копируем остальной кусок объекта и даем туда новое
        // значение фильта - вэлью(второй аргумент)
    }

    // const getFilteredTasksForRender = () => {
    //     switch (filter) {
    //         case "completed":
    //             return tasks.filter(t => t.isDone === true)
    //         case "active":
    //             return tasks.filter(t => t.isDone === false)
    //         default:
    //             return tasks
    //     }
    // }
    // let tasksForTodolist = tasks;
    //
    // if (filter === "active") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodolist = tasks.filter(t => t.isDone === true);
    // }
    // // const FilteredTasksForRender = getFilteredTasksForRender()

    const removeTask = (todolistID:string,taskID: string) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskID)})
        // const filteredTasks = tasks.filter(task => task.id !== taskID)
        // setTasks(filteredTasks)
        // console.log(tasks)
    }

    const addTask = (todolistID:string,title:string) => {
        setTasks({...tasks,[todolistID]:[{id: v1(),title: title,isDone: false},...tasks[todolistID]]})
        //    const newTask: TaskType = {id: v1(),title: title,isDone: false
        // }
        // const updatedTasks = [newTask,...tasks]
        // setTasks([ {
        //            id: v1(),
        //            title,
        //            isDone: false
        //     },...tasks])
    }
    const changeTaskStatus = (todolistID:string,taskID: string, isDone:boolean) =>{
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskID?{...el,isDone:isDone}:el)})
        // setTasks(tasks.map(task => task.id === taskID ? {...task, isDone: isDone}: task))
    }

    return (
        <div className="App">
            {todolists.map((el)=>{
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return(
                <ToDoList
                    key = {el.id}
                    todolistID = {el.id}
                    title={ el.title}
                    tasks={tasksForTodolist}
                    removeTask={ removeTask }
                    changeFilter={changeFilter}
                    addTask = {addTask}
                    filter={el.filter}
                    changeTaskStatus={changeTaskStatus}
                />
                )})}

            {/*<ToDoList title={"What to remember"} tasks={task_2} />*/ }
            {/*<ToDoList title={"What to ask"} tasks={task_3} />*/ }
        </div>
    );
}

export default App;
