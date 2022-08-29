import LeftNav from '../../components/LeftNav'
import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { UidContext } from '../../context/AppContext'
import Thread from '../../components/Thread'

function Home() {
    const uid = useContext( UidContext )
    const location = useLocation()

    return <section className="Home">
        <LeftNav />
        <div className='main'>
            <Thread />
        </div>
    </section >
}

export default Home
