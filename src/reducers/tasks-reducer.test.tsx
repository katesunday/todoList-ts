import {
    addTasksAC ,
    changeTaskStatusAC ,
    removeTasksAC ,
    tasksReducers ,
    TasksStateType ,
    updateTaskAC
} from './tasksReducers';
import {addNewTodoListAC , removeTodoListAC } from "./todolistsReducer";
import {TaskPriorities , TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType;
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1" ,
                title: "CSS" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"
            } ,
            {id: "2" ,
                title: "JS" ,
                status: TaskStatuses.Completed,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"
            } ,
            {id: "3" ,
                title: "React" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"
            }
        ] ,
        "todolistId2": [
            {id: "1" ,
                title: "bread" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId2"
            } ,
            {id: "2" ,
                title: "milk" ,
                status: TaskStatuses.Completed,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId2"
            } ,
            {id: "3" ,
                title: "tea" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId2"
            }
        ]
    };
})
test('correct task should be deleted from correct array' , () => {


    const action = removeTasksAC("todolistId2" , '2');

    const endState = tasksReducers(startState , action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1" ,
                title: "CSS" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"

            } ,
            {id: "2" ,
                title: "JS" ,
                status: TaskStatuses.Completed,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"
            } ,
            {id: "3" ,
                title: "React" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',

                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId1"
            }
        ] ,
        "todolistId2": [
            {id: "1" ,
                title: "bread" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId2"
            } ,
            {id: "3" ,
                title: "tea" ,
                status: TaskStatuses.New,
                deadline:'',
                order:0,
                startDate:'',
                priority:TaskPriorities.Low,
                addedDate:'',
                description:'',
                todoListId:"todolistId2"
            }
        ]
    });
})
test('correct task should be added to correct array' , () => {

    const action = addTasksAC({id: "1" ,
        title: "juce" ,
        status: TaskStatuses.New,
        deadline:'',
        order:0,
        startDate:'',
        priority:TaskPriorities.Low,
        addedDate:'',
        description:'',
        todoListId:"todolistId2"
    } );

    const endState = tasksReducers(startState , action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed' , () => {

    const action = changeTaskStatusAC("todolistId2" , '2' , TaskStatuses.New);

    const endState = tasksReducers(startState , action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);

});

test('title of task change' , () => {
    const action = updateTaskAC("todolistId2" , '2' , 'blabla');

    const endState = tasksReducers(startState , action)

    expect(endState["todolistId1"][1].title).toBe('JS');
    expect(endState["todolistId2"][1].title).toBe('blabla');

});
test('new array should be added when new todolist is added' , () => {

    const action = addNewTodoListAC("new todolist");

    const endState = tasksReducers(startState , action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted' , () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducers(startState , action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




