import Error from './components/Error'
//import Layout from './components/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './pages/Home'
import Admin from './components/Admin'
//import RequireAuth from './components/RequireAuth'
import { Routes, Route } from 'react-router-dom'

// import Welcome from './components/Welcome'
//import Unauthorized from './components/Unauthorized'
//import PersistLogin from './components/PersistLogin'
//import LinkPage from './components/Linkpage'
//const ROLES = `${ process.env.ROLES }`


function App() {

    return <Routes>
        {/* <Route path="/" element={ <Layout /> }> */ }

        {/* public routes */ }
        {/* <Route path="/" element={ <Connect /> } /> */ }
        <Route path="/" element={ <Login /> } />
        <Route path="signup" element={ <Signup /> } />

        {/* <Route path="linkpage" element={ <LinkPage /> } /> */ }
        {/* <Route path="unauthorized" element={ <Unauthorized /> } /> */ }

        {/* protected routes */ }
        {/* <Route element={ <PersistLogin /> }> */ }
        {/* <Route element={ <RequireAuth
                allowedRoles={ [ ROLES.Admin ] } /> }> {/* */ }

        <Route path="home" element={ <Home /> } />
        <Route path="admin" element={ <Admin /> } />

        {/* </Route> */ }

        {/* <Route element={ <RequireAuth 
                allowedRoles={ [ ROLES.Admin ] } /> }> {/**/ }
        {/* </Route> */ }
        {/* </Route> */ }
        {/* catch all */ }
        <Route path="*" element={ <Error /> } />
        {/* </Route> */ }
    </Routes>
    // </UidContext.Provider >
}

export default App