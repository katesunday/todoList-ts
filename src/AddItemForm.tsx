import React , {useState , KeyboardEvent , ChangeEvent , CSSProperties , memo} from 'react';
import {Button , TextField} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?:string
}
const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title , setTitle] = useState<string>('')
    const [error , setError] = useState<string | boolean>(false)

    const addItem = () => {
        if (title.trim() !== "") {

            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
            setTitle('')
        }
    }
    const errorMessageStyle: CSSProperties = {
        color: 'red' ,
        fontSize: '14px' ,
    }

    const errorMessage = error
        ? <div style={errorMessageStyle}>Title is required*</div>
        : null
    const errorInputClass = error ? 'error' : ''
    return (
        <div>
            <TextField id="outlined-basic" label={errorInputClass} variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       className={errorInputClass}
                       size={"small"}
                       error={!!errorInputClass}
                // helperText={error}
            />
            <Button onClick={addItem}
                    variant="contained"
                    sx={{
                        maxWidth: '40px' ,
                        maxHeight: '40px' ,
                        minWidth: '40px' ,
                        minHeight: '40px' ,
                    }}
                    disabled={props.disabled==='loading'}
            >+</Button>
            {/*<button onClick={onClickAddTask}>+</button>*/}
            {errorMessage}
        </div>
    );
});

export default AddItemForm;