import React from 'react';
import {FilterValuesType} from "./App";

type ControlButtonsType = {
    filter:FilterValuesType
    changeFilter: (todolistID:string,filter:FilterValuesType)  => void
    todolistID:string
}
const ControlButtons = (props:ControlButtonsType) => {
    const onCLickSetFilter = (todolistID:string,filter:FilterValuesType) => () => {
        props.changeFilter(todolistID,filter)
    }
    return (
        <div>
            <button className={props.filter === 'all'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'all')}>All</button>
            <button  className={props.filter === 'active'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'active')}>Active</button>
            <button className={props.filter === 'completed'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'completed')}>Completed</button>
        </div>
    );
};

export default ControlButtons;