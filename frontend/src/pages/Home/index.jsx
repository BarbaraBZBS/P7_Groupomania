import LeftNav from '../../components/LeftNav'
import { useContext } from 'react'
//import { useLocation, Navigate } from 'react-router-dom'
import { UidContext } from '../../context/AppContext'
import Thread from '../../components/Thread'
import Log from '../../components/Log'
import CreatePostForm from '../../components/Post/CreatePostForm'

function Home() {
    const uid = useContext( UidContext )

    return <section className="Home">
        { uid ? ( <>
            <LeftNav />
            <div className='main'>
                <div className='home-header'>
                    <CreatePostForm />
                </div>
                <Thread />
            </div>
        </>
        ) : (
            <Log login={ true } signup={ false } />
        ) }
    </section >
}

export default Home
