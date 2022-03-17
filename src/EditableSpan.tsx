import React , {ChangeEvent , useState} from 'react';
import './App.css';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    oldTitle:string
    nameOfClass: string
    callBack : (updateTitle:string) => void
}
const EditableSpan = (props:EditableSpanPropsType) => {
    const [edit,setEdit] = useState(false)
    const [newTitle,setNewTitle] = useState(props.oldTitle)
    const doubleClickHandler = () => {
      setEdit(true)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }
    return (
        edit
            // ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            ? <TextField
                id="outlined-basic" label="Outlined" variant="outlined"
                value={newTitle} onChange={onChangeHandler} autoFocus
                onBlur={onBlurHandler}
                size={"small"}
            />
        :<span onClick={doubleClickHandler} className={props.nameOfClass}>{props.oldTitle}</span>
    );
};

export default EditableSpan;