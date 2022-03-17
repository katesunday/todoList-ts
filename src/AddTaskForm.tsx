import React , {useState , KeyboardEvent , ChangeEvent , CSSProperties} from 'react';
import {Button , Grid , TextField} from "@material-ui/core";

type AddTaskFormPropsType = {
    addTask: ( title:string) =>void
}
const AddTaskForm = (props:AddTaskFormPropsType) => {
    const [title,setTitle] = useState<string>('')
    const [error,setError] = useState<boolean>(false)
    const onClickAddTask = () => {

        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(trimmedTitle)
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
          props.addTask(title)
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
            {/*<input value={title}*/}
            {/*       onChange={onChangeSetTitle}*/}
            {/*       onKeyPress={onKeyPressSetTitle}*/}
            {/*       className={errorInputClass}*/}
            {/*/>*/}
            <TextField id="outlined-basic" label={errorInputClass} variant="outlined"
                       value={title}
                       onChange={onChangeSetTitle}
                       onKeyPress={onKeyPressSetTitle}
                       className={errorInputClass}
                       size={"small"}
                       error={!!errorInputClass}
                // helperText={error}
            />
            <Button onClick={onClickAddTask}
                    variant="contained"
                    sx={{
                        maxWidth: '40px',
                        maxHeight: '40px',
                        minWidth: '40px',
                        minHeight: '40px',
                    }}
            >+</Button>
            {/*<button onClick={onClickAddTask}>+</button>*/}
            {errorMessage}
        </div>
    );
};

export default AddTaskForm;