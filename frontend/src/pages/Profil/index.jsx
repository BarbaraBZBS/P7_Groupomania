import { useContext } from 'react'
import Log from '../../components/Log'
import { UidContext } from '../../context/AppContext'
import UpdateProfil from '../../components/UpdateProfil'

const Profil = () => {
    const uid = useContext( UidContext )

    return <>
        { uid ? (
            <UpdateProfil />
        ) : (
            <div>
                <Log login={ false } signup={ true } />
            </div>
        ) }
    </>
}

export default Profil