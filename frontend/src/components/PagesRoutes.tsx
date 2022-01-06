import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import HomePage from './Pages/HomePage'
import RegisterPage from './Pages/RegisterPage'

export default function PagesRoutes() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path = '/' element={<HomePage/>}></Route>
                    <Route path = '/home' element={<HomePage/>}></Route>
                    <Route path = '/register/:option' element={<RegisterPage/>}></Route>
                </Routes>
            </Router>
        </div>
    )
}