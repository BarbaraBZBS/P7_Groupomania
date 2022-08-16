import React from 'react'
import ReactDOM from 'react-dom/client'
//import Home from './pages/Home/index'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Fence from './pages/Fence'
import Error from './components/Error'

//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot( document.getElementById( 'root' ) )
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <GlobalStyle /> */ }
            <Header />
            <Routes>
                <Route path='/' element={ <Fence /> } />
                {/* <Route path='/signup' element={ <Signup /> } /> */ }
                {/* <Route path='/survey/:questionNumber' element={ <Survey /> } /> */ }
                {/* <Route path='/results/' element={ <Results /> } /> */ }
                {/* <Route path='/freelances/' element={ <Freelance /> } /> */ }
                <Route path='*' element={ <Error /> } />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
