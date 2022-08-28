import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { UidContext } from '../../context/AppContext'

function Home() {
    const uid = useContext( UidContext )
    const location = useLocation()

    return <section className="Home">
        {/* { uid ? ( */ }
        <div>
            <h3>hello gmorning</h3>
            <p>JHGTJ JGBJRH GRJBGHJRG RBGJHR RHJGBJRH</p>
        </div>
        {/* ) : (
            <Navigate to="/" state={ { from: location } } replace />
        ) } */}

    </section >
}

export default Home
