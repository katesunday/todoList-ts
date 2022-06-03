import React , {memo} from 'react';
import {Button} from "@mui/material";
import {FilterValuesType} from "./reducers/todolistsReducer";


type ControlButtonsType = {
    filter:FilterValuesType
    changeFilter: (todolistID:string,filter:FilterValuesType)  => void
    todolistID:string
}
const ControlButtons = memo((props:ControlButtonsType) => {
    const onCLickSetFilter = (todolistID:string,filter:FilterValuesType) => () => {
        props.changeFilter(todolistID,filter)
    }
    return (
        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary" onClick={onCLickSetFilter(props.todolistID,'all')}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"}  color="success" onClick={onCLickSetFilter(props.todolistID,'active')}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"}  color="error" onClick={onCLickSetFilter(props.todolistID,'completed')}>Completed</Button>
            {/*<button className={props.filter === 'all'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'all')}>All</button>*/}
            {/*<button  className={props.filter === 'active'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'active')}>Active</button>*/}
            {/*<button className={props.filter === 'completed'? 'activeBtn':''} onClick={onCLickSetFilter(props.todolistID,'completed')}>Completed</button>*/}
        </div>
    );
});

export default ControlButtons;