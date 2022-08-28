import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'

const Layout = () => {
    return <div>
        <Header />
        <main className='App'>
            <Outlet />
        </main>
    </div>
}

export default Layout