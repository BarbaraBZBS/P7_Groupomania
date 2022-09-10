import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import { Navigate } from 'react-router-dom'
import Header from '../Header'

function Router() {
    return <div className='font-txt sm:text-xl p-0 m-0 box-border bg-apppink min-h-screen'>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path='/profil' element={ <Profil /> } />
                <Route path="*" element={ <Navigate to="/" replace /> } />
            </Routes>
        </BrowserRouter>
    </div>
}

export default Router