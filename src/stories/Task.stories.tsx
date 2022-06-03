import React from 'react';
import Task from "../Task";
import {ComponentMeta , ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskStatuses} from "../api/todolist-api";


export default {
    title: 'Todolist/Task' ,
    component: Task ,
    args: {
        todolistID:'todolistID1',
        changeTaskStatus: action('Status changed inside task') ,
        updateTask: action('Title changed inside task') ,
        removeTask: action('Remove button inside task clicked') ,
    },
    decorators:[ReduxStoreProviderDecorator]
    // argTypes:{
    //     task:{
    //         id: '1',
    //         title: 'JS',
    //         isDone: true,
    //     }
    // }
} as ComponentMeta<typeof Task>


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>


export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    id: '1' ,
    title: 'JS' ,
    status: TaskStatuses.Completed ,
    todolistID: 'todolistID1' ,

}
export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    id: '2' ,
    title: 'JS' ,
    status: TaskStatuses.New ,
    todolistID: 'todolistID1' ,

}

export const TaskInteractiveExample = Template.bind({})
TaskInteractiveExample.args = {
    id: '2' ,
    title: 'I should be interactive' ,
    status: TaskStatuses.New ,
    todolistID: 'todolistID1' ,

}

// const TaskWithRedux = ()=>{
//     const task = useSelector<AppRootStateType,TaskType>(state =>
//         state.tasks['todolistID1'].filter((el)=>el.id ==='2')[0])
//     return <Task id={task.id}
//                  title={task.title}
//                  isDone={task.isDone}
//                  todolistID={'todolistID1'}
//      />
// }