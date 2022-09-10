import LeftNav from '../../components/LeftNav'
import { useContext } from 'react'
import { UidContext } from '../../context/AppContext'
import Thread from '../../components/Thread'
import Log from '../../components/Log'
import CreatePostForm from '../../components/Post/CreatePostForm'

function Home() {
    const uid = useContext( UidContext )

    return <>
        { uid ? ( <main>
            <LeftNav />
            <div className='flex justify-center items-center flex-col text-center p-5'>
                <CreatePostForm />
                <Thread />
            </div>
        </main>
        ) : (
            <Log login={ true } signup={ false } />
        ) }
    </ >
}

export default Home
