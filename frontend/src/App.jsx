//import Home from './pages/Home/index'
import { Routes, Route } from 'react-router-dom'
import Error from './components/Error'
import Signup from './components/Signup'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './components/Login'
import Unauthorized from './components/Unauthorized'
import RequireAuth from './components/RequireAuth'
import Admin from './components/Admin'
import LinkPage from './components/Linkpage'

const ROLES = {
    'User': 2001,
    'Editor': 1984,
    'Admin': 5150
}

function App() {
    return <Routes>
        <Route path="/" element={ <Layout /> }>
            {/* public routes */ }
            <Route path="login" element={ <Login /> } />
            <Route path="signup" element={ <Signup /> } />
            <Route path="linkpage" element={ <LinkPage /> } />
            <Route path="unauthorized" element={ <Unauthorized /> } />

            {/* we want to protect these routes */ }
            <Route element={ <RequireAuth allowedRoles={ [ ROLES.User ] } /> }>
                <Route path="home" element={ <Home /> } />
            </Route>

            <Route element={ <RequireAuth allowedRoles={ [ ROLES.Admin ] } /> }>
                <Route path="admin" element={ <Admin /> } />
            </Route>

            {/* catch all */ }
            <Route path="*" element={ <Error /> } />
        </Route>
    </Routes>
}

export default App