import React , {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "./components/ButtonAppBar";
import {useDispatch} from "react-redux";
import {CircularProgress , Container} from "@mui/material";
import {Login} from "./features/Login";
import {Routes , Route } from 'react-router-dom';
import {TodolistsList} from "./TodolistsList";
import {Navigate} from 'react-router-dom'
import {initializeAppTC} from "./reducers/appReducer";
import {useAppSelector} from "./store/store";


function App(){
    const dispatch = useDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    } , [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed' , top: '30%' , textAlign: 'center' , width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div>
            <ButtonAppBar/>

            <Container fixed>

                    <Routes>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/todoList-ts' element={<TodolistsList />}/>
                        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element={<Navigate to='/404'/>}/>
                    </Routes>

            </Container>

        </div>
    );
}

export default App;
