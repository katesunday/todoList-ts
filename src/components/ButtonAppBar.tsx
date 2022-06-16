import * as React from 'react';
import {AppBar , Box , Button , IconButton  , Toolbar , Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useAppSelector} from "../store/store";
import {useDispatch} from "react-redux";
import {logoutTC} from "../reducers/auth-reducer";


export default function ButtonAppBar() {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    const logoutHandler = () => {
      dispatch(logoutTC())
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>  }

                </Toolbar>
            </AppBar>
        </Box>
    );
}