import React from "react"
import { AuthContext } from "../contexts/AuthContext"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { TaskList } from "../pages/TaskList";
import { CreateTask } from "../pages/CreateTask";
import { Register } from "../pages/Register";
import { UpdateTask } from "../pages/UpdateTask";




export const AppRouter = () => {

    const { isAuthenticated } = React.useContext(AuthContext)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? < TaskList /> : <Navigate to='/login' />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/create" element={isAuthenticated ? <CreateTask /> : <Navigate to='/login' />} />
                <Route path="/update/:id" element={<UpdateTask />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter >
    );
};