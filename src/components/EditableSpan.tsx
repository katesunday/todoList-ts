import React , {ChangeEvent , useState} from 'react';

type PropsType = {
    oldTitle:string
    callBack:(title:string)=>void
}
const EditableSpan = (props:PropsType) => {
    const [edit,setEdit] = useState(false)
    const [newTitle,setNewTitle] = useState(props.oldTitle)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const doubleClickHandler = () => {

    setEdit(true)
    }

    const onBlurHandler = () => {
        props.callBack(newTitle)
        setEdit(false)
    }

    return (
        edit
        ?<input autoFocus onBlur={onBlurHandler} onChange={onChangeHandler} value={newTitle}/>
            :  <span onClick={doubleClickHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;