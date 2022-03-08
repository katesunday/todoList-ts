import React , {useState , KeyboardEvent , ChangeEvent , CSSProperties} from 'react';

type AddTaskFormPropsType = {
    todolistID:string
    addTask: ( todolistID:string,title:string) =>void
}
const AddTaskForm = (props:AddTaskFormPropsType) => {
    const [title,setTitle] = useState<string>('')
    const [error,setError] = useState<boolean>(false)
    const onClickAddTask = () => {

        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(props.todolistID,trimmedTitle)
        }
        else {
            setError(true)
        }
        setTitle('')
    }
    const onChangeSetTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressSetTitle = (e:KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter'){
          props.addTask(props.todolistID,title)
          setTitle('')
      }
    }
    const errorMessageStyle: CSSProperties= {
        color:'red',
        fontSize: '14px',
    }

    const errorMessage = error
          ? <div style={errorMessageStyle}>Title is required*</div>
          : null
    const errorInputClass = error ? 'error': ''
    return (
        <div>
            <input value={title}
                   onChange={onChangeSetTitle}
                   onKeyPress={onKeyPressSetTitle}
                   className={errorInputClass}
            />
            <button onClick={onClickAddTask}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddTaskForm;