import React , {ChangeEvent , memo , useState} from 'react';
import './App.css';
import {TextField} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {RequestStatusType} from "./reducers/appReducer";

export type EditableSpanPropsType = {
    oldTitle:string
    nameOfClass: string
    callBack : (updateTitle:string) => void
}
const EditableSpan = memo((props:EditableSpanPropsType) => {
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

    const status = useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)
    return (
        edit
            // ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={onBlurHandler}/>
            ? <TextField
                id="outlined-basic" label="Outlined" variant="outlined"
                value={newTitle} onChange={onChangeHandler} autoFocus
                onBlur={onBlurHandler}
                size={"small"}
                disabled={status==='loading'}
            />
        :<span onClick={doubleClickHandler} className={props.nameOfClass}>{props.oldTitle}</span>
    );
});

export default EditableSpan;