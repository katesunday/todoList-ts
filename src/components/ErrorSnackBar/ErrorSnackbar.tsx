import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch , useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ErrorStateType , setAppErrorAC} from "../../reducers/appReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const [open, setOpen] = useState(true);
    const error = useSelector<AppRootStateType,ErrorStateType>(state => state.app.error)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        dispatch(setAppErrorAC(null));
        // if (reason === 'clickaway') {
        //
        //
        // }
        // setOpen(false);
    };

    return (
        <Snackbar open={ error !== null } autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}😠
            </Alert>
        </Snackbar>
    );
}
