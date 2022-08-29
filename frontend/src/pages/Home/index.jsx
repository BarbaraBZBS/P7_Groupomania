import LeftNav from '../../components/LeftNav'
import { useContext } from 'react'
//import { useLocation, Navigate } from 'react-router-dom'
import { UidContext } from '../../context/AppContext'
import Thread from '../../components/Thread'
import Log from '../../components/Log'

function Home() {
    const uid = useContext( UidContext )
    //const location = useLocation()

    return <section className="Home">
        { uid ? ( <>
            <LeftNav />
            <Thread />
        </>
        ) : (
            <Log login={ true } signup={ false } />
        ) }
    </section >
}

export default Home
