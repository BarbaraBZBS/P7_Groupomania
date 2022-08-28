import { useContext } from 'react'
import Log from '../../components/Log'
import { UidContext } from '../../context/AppContext'
import UpdateProfil from '../../components/UpdateProfil'

const Profil = () => {
    const uid = useContext( UidContext )

    return <main className='profil-page'>
        { uid ? (
            <UpdateProfil />
        ) : (
            <div className='profil-container'>
                <Log login={ false } signup={ true } />
            </div>
        ) }
    </main>
}

export default Profil